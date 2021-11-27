package diff

import (
	"bytes"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/minio/sha256-simd"

	"github.com/gadget-inc/fsdiff/pkg/pb"
)

const (
	fileLimit = 100_000
	timeLimit = 250 * time.Millisecond
)

func hashFile(path string) ([]byte, error) {
	content, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	hash := sha256.Sum256(content)
	return hash[:], nil
}

func hashLink(path string) ([]byte, error) {
	target, err := os.Readlink(path)
	if err != nil {
		return nil, err
	}

	hash := sha256.Sum256([]byte(target))
	return hash[:], nil
}

func hashEmptyDir() []byte {
	hash := sha256.Sum256([]byte(""))
	return hash[:]
}

type Entry struct {
	path string
	mode fs.FileMode
	hash []byte
	err  error
}

func (e *Entry) toPb() *pb.Entry {
	return &pb.Entry{
		Path: e.path,
		Mode: uint32(e.mode),
		Hash: e.hash,
	}
}

func WalkChan(dir string, ignores []string) <-chan *Entry {
	entryChan := make(chan *Entry, 100)

	pushErr := func(err error) error {
		entryChan <- &Entry{
			err: err,
		}
		return err
	}

	pushEmptyDir := func(path string, mode fs.FileMode) {
		entryChan <- &Entry{
			path: fmt.Sprintf("%s/", path),
			mode: mode,
			hash: hashEmptyDir(),
		}
	}

	go func() {
		defer close(entryChan)
		maybeEmptyDir := ""
		emptyDirMode := fs.FileMode(0)

		filepath.WalkDir(dir, func(path string, entry fs.DirEntry, err error) error {
			if maybeEmptyDir != "" {
				if !strings.HasPrefix(path, filepath.Join(dir, maybeEmptyDir)) {
					pushEmptyDir(maybeEmptyDir, emptyDirMode)
				}
				maybeEmptyDir = ""
				emptyDirMode = fs.FileMode(0)
			}

			if err != nil {
				return pushErr(fmt.Errorf("walk dir: %w", err))
			}

			relativePath, err := filepath.Rel(dir, path)
			if err != nil {
				return pushErr(fmt.Errorf("relative path: %w", err))
			}

			for _, ignore := range ignores {
				if relativePath == ignore {
					return nil
				}
			}

			info, err := entry.Info()
			// If the file has been removed while walking the directory
			// Do not emit it and pretend it was never seen by this walker.
			if errors.Is(err, fs.ErrNotExist) {
				return nil
			}
			if err != nil {
				return pushErr(fmt.Errorf("stat file: %w", err))
			}

			if entry.IsDir() {
				maybeEmptyDir = relativePath
				emptyDirMode = info.Mode()
				return nil
			}

			var hash []byte

			if info.Mode()&os.ModeSymlink == os.ModeSymlink {
				hash, err = hashLink(path)
			} else {
				hash, err = hashFile(path)
			}
			if errors.Is(err, fs.ErrNotExist) {
				return nil
			}
			if err != nil {
				return pushErr(fmt.Errorf("hash file: %w", err))
			}

			entryChan <- &Entry{
				path: relativePath,
				mode: info.Mode(),
				hash: hash[:],
				err:  nil,
			}

			return nil
		})

		if maybeEmptyDir != "" {
			pushEmptyDir(maybeEmptyDir, emptyDirMode)
		}
	}()

	return entryChan
}

func SummaryChan(summary *pb.Summary) <-chan *Entry {
	entryChan := make(chan *Entry, 100)

	go func() {
		defer close(entryChan)

		for _, entry := range summary.Entries {
			entryChan <- &Entry{
				path: entry.Path,
				mode: fs.FileMode(entry.Mode),
				hash: entry.Hash,
				err:  nil,
			}
		}
	}()

	return entryChan
}

func pathLessThan(left, right string) bool {
	leftSplits := strings.Split(left, "/")
	rightSplits := strings.Split(right, "/")

	for idx, leftSplit := range leftSplits {
		if idx >= len(rightSplits) {
			return false
		}
		rightSplit := rightSplits[idx]

		if leftSplit > rightSplit {
			return false
		}

		if leftSplit < rightSplit {
			return true
		}
	}

	return false
}

type channelInfo struct {
	name    string
	count   int
	channel <-chan *Entry
}

func readFromChan(info *channelInfo) (*Entry, bool) {
	if info.count > fileLimit {
		return &Entry{
			err: fmt.Errorf("maximum file count reached from: %v", info.name),
		}, false
	}

	select {
	case entry, open := <-info.channel:
		info.count += 1
		return entry, open
	case <-time.After(timeLimit):
		return &Entry{
			err: fmt.Errorf("timeout waiting for entry from: %v", info.name),
		}, false
	}
}

func Diff(walkC, sumC <-chan *Entry) (*pb.Diff, *pb.Summary, error) {
	start := time.Now().Unix()
	diff := &pb.Diff{CreatedAt: start}
	summary := &pb.Summary{CreatedAt: start}

	walk := channelInfo{name: "walk", channel: walkC}
	sum := channelInfo{name: "sum", channel: sumC}

	walkEntry, walkOpen := readFromChan(&walk)
	sumEntry, sumOpen := readFromChan(&sum)

	for {
		if walkEntry != nil && walkEntry.err != nil {
			return nil, nil, walkEntry.err
		}
		if sumEntry != nil && sumEntry.err != nil {
			return nil, nil, sumEntry.err
		}

		if !walkOpen && !sumOpen {
			return diff, summary, nil
		}

		if !walkOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumEntry.path,
				Action: pb.Update_REMOVE,
			})

			sumEntry, sumOpen = readFromChan(&sum)
			continue
		}

		if !sumOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkEntry.path,
				Action: pb.Update_ADD,
			})
			summary.Entries = append(summary.Entries, walkEntry.toPb())

			walkEntry, walkOpen = readFromChan(&walk)
			continue
		}

		if walkEntry.path == sumEntry.path {
			if walkEntry.mode != sumEntry.mode || !bytes.Equal(walkEntry.hash, sumEntry.hash) {
				diff.Updates = append(diff.Updates, &pb.Update{
					Path:   walkEntry.path,
					Action: pb.Update_CHANGE,
				})
			}

			summary.Entries = append(summary.Entries, walkEntry.toPb())

			walkEntry, walkOpen = readFromChan(&walk)
			sumEntry, sumOpen = readFromChan(&sum)
			continue
		}

		if pathLessThan(sumEntry.path, walkEntry.path) {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumEntry.path,
				Action: pb.Update_REMOVE,
			})

			sumEntry, sumOpen = readFromChan(&sum)
		} else {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkEntry.path,
				Action: pb.Update_ADD,
			})
			summary.Entries = append(summary.Entries, walkEntry.toPb())

			walkEntry, walkOpen = readFromChan(&walk)
		}
	}
}
