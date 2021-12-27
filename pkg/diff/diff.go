package diff

import (
	"errors"
	"fmt"
	"io/fs"
	"path/filepath"
	"strings"
	"time"

	"github.com/gadget-inc/fsdiff/pkg/pb"
	"google.golang.org/protobuf/proto"
)

type Message struct {
	entry *pb.Entry
	err   error
}

func WalkChan(dir string, ignores []string) <-chan *Message {
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

			if entry.IsDir() {
				maybeEmptyDir = &pb.Entry{
					Path:    fmt.Sprintf("%s/", relativePath),
					Mode:    uint32(info.Mode()),
					ModTime: info.ModTime().UnixNano(),
					Size:    info.Size(),
				}
				return nil
			}

			channel <- &Message{
				entry: &pb.Entry{
					Path:    relativePath,
					Mode:    uint32(info.Mode()),
					ModTime: info.ModTime().UnixNano(),
					Size:    info.Size(),
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

func SummaryChan(summary *pb.Summary) <-chan *Message {
	channel := make(chan *Message, 100)

	go func() {
		defer close(channel)

		for _, entry := range summary.Entries {
			channel <- &Message{
				entry: proto.Clone(entry).(*pb.Entry),
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

func Diff(walk, sum <-chan *Message) (*pb.Diff, *pb.Summary, error) {
	diff := &pb.Diff{}
	summary := &pb.Summary{}

	walkMessage, walkOpen := <-walk
	sumMessage, sumOpen := <-sum

	for {
		if walkMessage != nil && walkMessage.err != nil {
			return nil, nil, walkMessage.err
		}
		if sumMessage != nil && sumMessage.err != nil {
			return nil, nil, sumMessage.err
		}

		if !walkOpen && !sumOpen {
			summary.LatestModTime = findLatestModTime(summary)

			// Without this short sleep it is possible for the following sequence to occur:
			//   1. Diff() is run on a directory and the latest detected modTime is X
			//   2. files within that directory are very quickly updated
			//   3. Diff() is run again and no updates are detected
			//
			// This situation occurs because the modTime for the files updated in step 2
			// will be equal to X even though they occured after the first Diff() completed
			//
			// It seems that if a file is modified multiple times in very quick succession
			// (on the order of nanoseconds) the modTime for the file will not be updated
			time.Sleep(10 * time.Millisecond)

			return diff, summary, nil
		}

		if !walkOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumMessage.entry.Path,
				Action: pb.Update_REMOVE,
			})

			sumMessage, sumOpen = <-sum
			continue
		}

		if !sumOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkMessage.entry.Path,
				Action: pb.Update_ADD,
			})
			summary.Entries = append(summary.Entries, walkMessage.entry)

			walkMessage, walkOpen = <-walk
			continue
		}

		walkEntry := walkMessage.entry
		sumEntry := sumMessage.entry

		if walkEntry.Path == sumEntry.Path {
			if walkEntry.Mode != sumEntry.Mode || walkEntry.ModTime != sumEntry.ModTime || walkEntry.Size != sumEntry.Size {
				diff.Updates = append(diff.Updates, &pb.Update{
					Path:   walkEntry.Path,
					Action: pb.Update_CHANGE,
				})
			}

			summary.Entries = append(summary.Entries, walkEntry)

			walkMessage, walkOpen = <-walk
			sumMessage, sumOpen = <-sum
			continue
		}

		if pathLessThan(sumEntry.Path, walkEntry.Path) {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumEntry.Path,
				Action: pb.Update_REMOVE,
			})

			sumMessage, sumOpen = <-sum
		} else {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkEntry.Path,
				Action: pb.Update_ADD,
			})
			summary.Entries = append(summary.Entries, walkEntry)

			walkMessage, walkOpen = <-walk
		}
	}
}
