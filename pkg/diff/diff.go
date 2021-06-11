package diff

import (
	"bytes"
	"crypto/sha256"
	"io/fs"
	"os"
	"path/filepath"
	"time"

	"github.com/angelini/fsdiff/pkg/pb"
)

func hashFile(path string) ([]byte, error) {
	content, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	hash := sha256.Sum256(content)
	return hash[:], nil
}

type Entry struct {
	path string
	mode int64
	hash []byte
	err  error
}

func WalkChan(dir string) <-chan *Entry {
	entryChan := make(chan *Entry, 100)

	go func() {
		filepath.WalkDir(dir, func(path string, entry fs.DirEntry, err error) error {
			pushErr := func(e error) error {
				entryChan <- &Entry{
					path: path,
					mode: 0,
					err:  e,
				}
				return e
			}

			if err != nil {
				return pushErr(err)
			}

			if entry.IsDir() {
				// FIXME: Handle empty directories
				return nil
			}

			relativePath, err := filepath.Rel(dir, path)
			if err != nil {
				return pushErr(err)
			}

			info, err := entry.Info()
			if err != nil {
				return pushErr(err)
			}

			hash, err := hashFile(path)
			if err != nil {
				return pushErr(err)
			}

			entryChan <- &Entry{
				path: relativePath,
				mode: int64(info.Mode()),
				hash: hash,
				err:  nil,
			}

			return nil
		})

		close(entryChan)
	}()

	return entryChan
}

func SummaryChan(path string) <-chan *Entry {
	entryChan := make(chan *Entry, 100)

	if path == "" {
		close(entryChan)
		return entryChan
	}

	go func() {
		summary, err := ReadSummary(path)
		if err != nil {
			entryChan <- &Entry{
				path: "",
				mode: 0,
				hash: nil,
				err:  err,
			}
			close(entryChan)
			return
		}

		for _, entry := range summary.Entries {
			entryChan <- &Entry{
				path: filepath.Join(entry.RelativeDir, entry.Name),
				mode: entry.Mode,
				hash: entry.Hash,
				err:  nil,
			}
		}

		close(entryChan)
	}()

	return entryChan
}

func Diff(walkC, sumC <-chan *Entry) (*pb.Diff, *pb.Summary, error) {
	start := time.Now().Unix()
	diff := &pb.Diff{CreatedAt: start}
	sum := &pb.Summary{CreatedAt: start}

	walkEntry, walkOpen := <-walkC
	sumEntry, sumOpen := <-sumC

	for {
		if !walkOpen && !sumOpen {
			return diff, sum, nil
		}

		if walkEntry != nil && walkEntry.err != nil {
			return nil, nil, walkEntry.err
		}
		if sumEntry != nil && sumEntry.err != nil {
			return nil, nil, sumEntry.err
		}

		if !walkOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumEntry.path,
				Action: pb.Update_REMOVE,
			})

			sumEntry, sumOpen = <-sumC
			continue
		}

		if !sumOpen {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkEntry.path,
				Action: pb.Update_ADD,
			})
			sum.Entries = append(sum.Entries, &pb.FileEntry{
				RelativeDir: filepath.Dir(walkEntry.path),
				Name:        filepath.Base(walkEntry.path),
				Mode:        walkEntry.mode,
				Hash:        walkEntry.hash,
			})

			walkEntry, walkOpen = <-walkC
			continue
		}

		if walkEntry.path == sumEntry.path {
			if walkEntry.mode != sumEntry.mode || !bytes.Equal(walkEntry.hash, sumEntry.hash) {
				diff.Updates = append(diff.Updates, &pb.Update{
					Path:   walkEntry.path,
					Action: pb.Update_CHANGE,
				})
				sum.Entries = append(sum.Entries, &pb.FileEntry{
					RelativeDir: filepath.Dir(walkEntry.path),
					Name:        filepath.Base(walkEntry.path),
					Mode:        walkEntry.mode,
					Hash:        walkEntry.hash,
				})
			} else {
				sum.Entries = append(sum.Entries, &pb.FileEntry{
					RelativeDir: filepath.Dir(walkEntry.path),
					Name:        filepath.Base(walkEntry.path),
					Mode:        walkEntry.mode,
					Hash:        walkEntry.hash,
				})
			}

			walkEntry, walkOpen = <-walkC
			sumEntry, sumOpen = <-sumC
			continue
		}

		if walkEntry.path > sumEntry.path {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   sumEntry.path,
				Action: pb.Update_REMOVE,
			})

			sumEntry, sumOpen = <-sumC
		} else {
			diff.Updates = append(diff.Updates, &pb.Update{
				Path:   walkEntry.path,
				Action: pb.Update_ADD,
			})
			sum.Entries = append(sum.Entries, &pb.FileEntry{
				RelativeDir: filepath.Dir(walkEntry.path),
				Name:        filepath.Base(walkEntry.path),
				Mode:        walkEntry.mode,
				Hash:        walkEntry.hash,
			})

			walkEntry, walkOpen = <-walkC
		}
	}
}
