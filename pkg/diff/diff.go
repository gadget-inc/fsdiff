package diff

import (
	"bytes"
	"crypto/sha256"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"syscall"

	"github.com/gadget-inc/fsdiff/pkg/pb"
)

func isLink(mode uint32) bool {
	return os.FileMode(mode)&os.ModeSymlink == os.ModeSymlink
}

type Message struct {
	entry *pb.Entry
	err   error
}

func walkChan(dir string, ignores []string) <-chan *Message {
	channel := make(chan *Message, 100)

	pushErr := func(err error) error {
		channel <- &Message{
			err: err,
		}
		return err
	}

	pushEmptyDir := func(entry *pb.Entry) {
		channel <- &Message{
			entry: entry,
		}
	}

	go func() {
		defer close(channel)

		var maybeEmptyDir *pb.Entry

		filepath.WalkDir(dir, func(path string, entry fs.DirEntry, err error) error {
			if maybeEmptyDir != nil {
				if !strings.HasPrefix(path, filepath.Join(dir, maybeEmptyDir.Path)) {
					pushEmptyDir(maybeEmptyDir)
				}
				maybeEmptyDir = nil
			}

			if errors.Is(err, fs.ErrNotExist) {
				if entry != nil && entry.IsDir() {
					return fs.SkipDir
				}
				return nil
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

			// Fetch the inode if we can, otherwise fallback to setting it to 0
			inode := uint64(0)
			sysStat, ok := info.Sys().(*syscall.Stat_t)
			if ok {
				inode = sysStat.Ino
			}

			if entry.IsDir() {
				maybeEmptyDir = &pb.Entry{
					Path:    fmt.Sprintf("%s/", relativePath),
					Mode:    uint32(os.ModeDir),
					ModTime: info.ModTime().UnixNano(),
					Size:    0,
					Inode:   inode,
				}
				return nil
			}

			mode := uint32(info.Mode())
			size := info.Size()

			// Normalizing required as this is not consistent across MacOS and Linux
			if isLink(mode) {
				mode = uint32(os.ModeSymlink)
				size = 0
			}

			channel <- &Message{
				entry: &pb.Entry{
					Path:    relativePath,
					Mode:    mode,
					ModTime: info.ModTime().UnixNano(),
					Size:    size,
					Inode:   inode,
				},
			}

			return nil
		})

		if maybeEmptyDir != nil {
			pushEmptyDir(maybeEmptyDir)
		}
	}()

	return channel
}

func summaryChan(summary *pb.Summary) <-chan *Message {
	channel := make(chan *Message, 100)

	if summary == nil {
		summary = &pb.Summary{}
	}

	go func() {
		defer close(channel)

		for _, entry := range summary.Entries {
			channel <- &Message{
				entry: entry,
			}
		}
	}()

	return channel
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

func findLatestModTime(summary *pb.Summary) int64 {
	latest := int64(0)

	for _, entry := range summary.Entries {
		if entry.ModTime > latest {
			latest = entry.ModTime
		}
	}

	return latest
}

func isEmptyDir(entry *pb.Entry) bool {
	return strings.HasSuffix(entry.Path, "/")
}

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

func hashEntry(dir string, entry *pb.Entry) ([]byte, error) {
	var hash []byte
	var err error

	path := filepath.Join(dir, entry.Path)

	if isEmptyDir(entry) {
		hash = hashEmptyDir()
	} else if isLink(entry.Mode) {
		hash, err = hashLink(path)
	} else {
		hash, err = hashFile(path)
	}

	if err != nil {
		return nil, fmt.Errorf("error hashing path %v: %w", entry.Path, err)
	}
	return hash, nil
}

// Only store the hash for files with a mod time equal to the latest mod time in the summary
// This is slow to calcualte, so we only save it for files that we won't be able to rely on their mod time to know if they changed
// In the case where the file to hash no longer exists, mark the file as removed
func hashLatestEntries(dir string, summary *pb.Summary, diff *pb.Diff) error {
	markAsRemoved := func(path string) {
		for _, update := range diff.Updates {
			if update.Path == path {
				update.Action = pb.Update_REMOVE
				return
			}
		}
	}

	idx := 0
	for _, entry := range summary.Entries {
		if entry.ModTime == summary.LatestModTime {
			hash, err := hashEntry(dir, entry)
			if errors.Is(err, fs.ErrNotExist) {
				markAsRemoved(entry.Path)
				continue
			}
			if err != nil {
				return err
			}

			entry.Hash = hash
		}

		summary.Entries[idx] = entry
		idx++
	}

	// Remove any dangling elements on the end of the slice
	for j := idx; j < len(summary.Entries); j++ {
		summary.Entries[j] = nil
	}
	summary.Entries = summary.Entries[:idx]

	return nil
}

// Used to prune the following case from the diff list
// i:   pb.Update{ Action: pb.Update_REMOVE, Path: "empty/dir/" }
// i+1: pb.Update{ Action: pb.Update_ADD,    Path: "empty/dir/a" }
//
// We do not want to delete an empty directory that we're also adding files to
func removeOverlappingUpdates(updates []*pb.Update) []*pb.Update {
	for i := len(updates) - 1; i >= 0; i-- {
		update := updates[i]
		if strings.HasSuffix(update.Path, "/") && update.Action == pb.Update_REMOVE {
			if len(updates) > i+1 && strings.HasPrefix(updates[i+1].Path, update.Path) {
				updates = append(updates[:i], updates[i+1:]...)
			}
		}
	}
	return updates
}

func Diff(dir string, ignores []string, previous *pb.Summary) (*pb.Diff, *pb.Summary, error) {
	walkC := walkChan(dir, ignores)
	sumC := summaryChan(previous)

	diff := &pb.Diff{}
	sum := &pb.Summary{}

	walkMessage, walkOpen := <-walkC
	sumMessage, sumOpen := <-sumC

	for {
		if walkMessage != nil && walkMessage.err != nil {
			return nil, nil, walkMessage.err
		}
		if sumMessage != nil && sumMessage.err != nil {
			return nil, nil, sumMessage.err
		}

		if !walkOpen && !sumOpen {
			sum.LatestModTime = findLatestModTime(sum)
			diff.Updates = removeOverlappingUpdates(diff.Updates)

			err := hashLatestEntries(dir, sum, diff)
			if err != nil {
				return nil, nil, err
			}

			return diff, sum, nil
		}

		if !walkOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumMessage.entry.Path,
				Action: pb.Update_REMOVE,
			})

			sumMessage, sumOpen = <-sumC
			continue
		}

		if !sumOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkMessage.entry.Path,
				Action: pb.Update_ADD,
			})
			sum.Entries = append(sum.Entries, walkMessage.entry)

			walkMessage, walkOpen = <-walkC
			continue
		}

		walkEntry := walkMessage.entry
		sumEntry := sumMessage.entry

		if walkEntry.Path == sumEntry.Path {
			if walkEntry.Mode != sumEntry.Mode || walkEntry.ModTime != sumEntry.ModTime || walkEntry.Size != sumEntry.Size || walkEntry.Inode != sumEntry.Inode {
				diff.Updates = append(diff.Updates, &pb.Update{
					Path:   walkEntry.Path,
					Action: pb.Update_CHANGE,
				})
			} else if walkEntry.ModTime == previous.LatestModTime {
				hash, err := hashEntry(dir, walkEntry)
				if err != nil {
					return nil, nil, err
				}
				if sumEntry.Hash == nil {
					return nil, nil, fmt.Errorf("expected hash in summary for path %v but it was not recorded", sumEntry.Path)
				}

				if !bytes.Equal(hash, sumEntry.Hash) {
					diff.Updates = append(diff.Updates, &pb.Update{
						Path:   walkEntry.Path,
						Action: pb.Update_CHANGE,
					})
				}
			}

			sum.Entries = append(sum.Entries, walkEntry)

			walkMessage, walkOpen = <-walkC
			sumMessage, sumOpen = <-sumC
			continue
		}

		if pathLessThan(sumEntry.Path, walkEntry.Path) {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumEntry.Path,
				Action: pb.Update_REMOVE,
			})

			sumMessage, sumOpen = <-sumC
		} else {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkEntry.Path,
				Action: pb.Update_ADD,
			})
			sum.Entries = append(sum.Entries, walkEntry)

			walkMessage, walkOpen = <-walkC
		}
	}
}
