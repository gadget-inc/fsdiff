package test

import (
	"bytes"
	"crypto/sha256"
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/gadget-inc/fsdiff/pkg/diff"
	"github.com/gadget-inc/fsdiff/pkg/pb"
)

var (
	emptySummary = pb.Summary{}
)

func writeTmpFiles(t *testing.T, files map[string]string) string {
	dir, err := os.MkdirTemp("", "dateilager_tests_")
	if err != nil {
		t.Fatal("cannot create tmp dir")
	}

	for name, content := range files {
		parent := filepath.Join(dir, filepath.Dir(name))
		if _, err = os.Stat(parent); errors.Is(err, os.ErrNotExist) {
			os.MkdirAll(parent, 0o777)
		}

		err = os.WriteFile(filepath.Join(dir, name), []byte(content), 0755)
		if err != nil {
			t.Fatalf("write tmp file %v: %v", filepath.Join(dir, name), err)
		}
	}

	return dir
}

func updateTmpFiles(t *testing.T, dir string, updates map[string]string, deletes []string) {
	for name, content := range updates {
		parent := filepath.Join(dir, filepath.Dir(name))
		if _, err := os.Stat(parent); errors.Is(err, os.ErrNotExist) {
			os.MkdirAll(parent, 0o777)
		}

		err := os.WriteFile(filepath.Join(dir, name), []byte(content), 0o755)
		if err != nil {
			t.Fatalf("update tmp file %v: %v", filepath.Join(dir, name), err)
		}
	}

	for _, delete := range deletes {
		err := os.RemoveAll(filepath.Join(dir, delete))
		if err != nil {
			t.Fatalf("remove tmp file %v: %v", filepath.Join(dir, delete), err)
		}
	}
}

func createLink(t *testing.T, dir, source, target string) {
	sourcePath := filepath.Join(dir, source)
	targetPath := filepath.Join(dir, target)

	if _, err := os.Stat(targetPath); err == nil {
		os.Remove(targetPath)
	}

	err := os.Symlink(sourcePath, targetPath)
	if err != nil {
		t.Fatalf("create symlink from %v to %v: %v", sourcePath, targetPath, err)
	}
}

func createDir(t *testing.T, dir, name string) {
	err := os.Mkdir(filepath.Join(dir, name), 0o777)
	if err != nil {
		t.Fatalf("create directory %v: %v", filepath.Join(dir, name), err)
	}
}

func verifyUpdates(t *testing.T, actual []*pb.Update, expected map[string]pb.Update_Action) {
	if len(actual) != len(expected) {
		t.Errorf("mismatch update count, expected %v, got: %v", len(expected), len(actual))
	}

	for _, update := range actual {
		if exp, ok := expected[update.Path]; ok {
			if update.Action != exp {
				t.Errorf("mismatch action for %v, expected: %v, got: %v", update.Path, exp, update.Action)
			}
		} else {
			t.Errorf("unexpected path %v", update.Path)
		}
	}
}

type expectedEntry struct {
	mode uint32
	hash [32]byte
}

func entry(content string) expectedEntry {
	return expectedEntry{
		mode: 0o755,
		hash: sha256.Sum256([]byte(content)),
	}
}

func link(source string) expectedEntry {
	return expectedEntry{
		mode: 0o777 + 0x8000000,
		hash: sha256.Sum256([]byte(source)),
	}
}

func directory() expectedEntry {
	return expectedEntry{
		mode: 0o755 + 0x80000000,
		hash: sha256.Sum256([]byte("")),
	}
}

func verifyEntries(t *testing.T, actual []*pb.Entry, expected map[string]expectedEntry) {
	if len(actual) != len(expected) {
		t.Errorf("mismatch entries count, expected %v, got: %v", len(expected), len(actual))
	}

	for _, entry := range actual {
		if exp, ok := expected[entry.Path]; ok {
			if !bytes.Equal(entry.Hash, exp.hash[:]) {
				t.Errorf("mismatch entry hash for %v, expected: 0x%x, got: 0x%x", entry.Path, exp.hash, entry.Hash)
			}
			if entry.Mode != exp.mode {
				t.Errorf("mismatch entry mode for %v, expected: %v, got: %v", entry.Path, exp.mode, entry.Mode)
			}
		} else {
			t.Errorf("unexpected path %v", entry.Path)
		}
	}
}

func TestDiffWithoutSummary(t *testing.T) {
	tmpDir := writeTmpFiles(t, map[string]string{
		"a": "a1",
		"b": "b1",
		"c": "c1",
	})
	defer os.RemoveAll(tmpDir)

	d1, s1, err := diff.Diff(diff.WalkChan(tmpDir, nil, 0), diff.SummaryChan(&emptySummary))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d1.Updates, map[string]pb.Update_Action{
		"a": pb.Update_ADD,
		"b": pb.Update_ADD,
		"c": pb.Update_ADD,
	})

	verifyEntries(t, s1.Entries, map[string]expectedEntry{
		"a": entry("a1"),
		"b": entry("b1"),
		"c": entry("c1"),
	})
}

func TestDiffWithSummary(t *testing.T) {
	tmpDir := writeTmpFiles(t, map[string]string{
		"a": "a1",
		"b": "b1",
		"c": "c1",
	})
	defer os.RemoveAll(tmpDir)

	_, s1, err := diff.Diff(diff.WalkChan(tmpDir, nil, 0), diff.SummaryChan(&emptySummary))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	updateTmpFiles(t, tmpDir, map[string]string{
		"b": "b2",
		"d": "d2",
	}, []string{"c"})

	d2, s2, err := diff.Diff(diff.WalkChan(tmpDir, nil, s1.LatestModTime), diff.SummaryChan(s1))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d2.Updates, map[string]pb.Update_Action{
		"b": pb.Update_CHANGE,
		"c": pb.Update_REMOVE,
		"d": pb.Update_ADD,
	})

	verifyEntries(t, s2.Entries, map[string]expectedEntry{
		"a": entry("a1"),
		"b": entry("b2"),
		"d": entry("d2"),
	})
}

func TestDiffWithIgnores(t *testing.T) {
	tmpDir := writeTmpFiles(t, map[string]string{
		"a":         "a1",
		"b":         "b1",
		".ignore_1": "ignore",
		".ignore_2": "ignore",
	})
	defer os.RemoveAll(tmpDir)

	d1, s1, err := diff.Diff(diff.WalkChan(tmpDir, []string{".ignore_1", ".ignore_2"}, 0), diff.SummaryChan(&emptySummary))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d1.Updates, map[string]pb.Update_Action{
		"a": pb.Update_ADD,
		"b": pb.Update_ADD,
	})

	verifyEntries(t, s1.Entries, map[string]expectedEntry{
		"a": entry("a1"),
		"b": entry("b1"),
	})

	updateTmpFiles(t, tmpDir, map[string]string{
		"b":         "b2",
		".ignore_2": "new ignore",
	}, []string{})

	d2, s2, err := diff.Diff(diff.WalkChan(tmpDir, []string{".ignore_1", ".ignore_2"}, s1.LatestModTime), diff.SummaryChan(s1))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d2.Updates, map[string]pb.Update_Action{
		"b": pb.Update_CHANGE,
	})

	verifyEntries(t, s2.Entries, map[string]expectedEntry{
		"a": entry("a1"),
		"b": entry("b2"),
	})
}

// FIXME: Currently broken on MacOS, symlinks do not have the same Mode as on Linux
//
// func TestDiffWithSymlinks(t *testing.T) {
// 	tmpDir := writeTmpFiles(t, map[string]string{
// 		"a": "a1",
// 		"b": "b1",
// 	})
// 	defer os.RemoveAll(tmpDir)

// 	createLink(t, tmpDir, "b", "c")

// 	d1, s1, err := diff.Diff(diff.WalkChan(tmpDir, []string{}), diff.SummaryChan(&emptySummary))
// 	if err != nil {
// 		t.Fatalf("failed to run diff: %v", err)
// 	}

// 	verifyUpdates(t, d1.Updates, map[string]pb.Update_Action{
// 		"a": pb.Update_ADD,
// 		"b": pb.Update_ADD,
// 		"c": pb.Update_ADD,
// 	})

// 	verifyEntries(t, s1.Entries, map[string]expectedEntry{
// 		"a": entry("a1"),
// 		"b": entry("b1"),
// 		"c": link(filepath.Join(tmpDir, "b")),
// 	})

// 	updateTmpFiles(t, tmpDir, map[string]string{}, []string{"c"})
// 	createLink(t, tmpDir, "a", "b")

// 	d2, s2, err := diff.Diff(diff.WalkChan(tmpDir, []string{}), diff.SummaryChan(s1))
// 	if err != nil {
// 		t.Fatalf("failed to run diff: %v", err)
// 	}

// 	verifyUpdates(t, d2.Updates, map[string]pb.Update_Action{
// 		"b": pb.Update_CHANGE,
// 		"c": pb.Update_REMOVE,
// 	})

// 	verifyEntries(t, s2.Entries, map[string]expectedEntry{
// 		"a": entry("a1"),
// 		"b": link(filepath.Join(tmpDir, "a")),
// 	})
// }

func TestDiffWithDirectories(t *testing.T) {
	tmpDir := writeTmpFiles(t, map[string]string{
		"a":   "a1",
		"b/c": "c1",
		"b/d": "d1",
		"e/f": "f1",
	})
	defer os.RemoveAll(tmpDir)

	d1, s1, err := diff.Diff(diff.WalkChan(tmpDir, []string{}, 0), diff.SummaryChan(&emptySummary))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d1.Updates, map[string]pb.Update_Action{
		"a":   pb.Update_ADD,
		"b/c": pb.Update_ADD,
		"b/d": pb.Update_ADD,
		"e/f": pb.Update_ADD,
	})

	verifyEntries(t, s1.Entries, map[string]expectedEntry{
		"a":   entry("a1"),
		"b/c": entry("c1"),
		"b/d": entry("d1"),
		"e/f": entry("f1"),
	})

	updateTmpFiles(t, tmpDir, map[string]string{
		"b/c": "c2",
		"b/g": "g2",
		"h/i": "i2",
	}, []string{"e"})

	d2, s2, err := diff.Diff(diff.WalkChan(tmpDir, []string{}, s1.LatestModTime), diff.SummaryChan(s1))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d2.Updates, map[string]pb.Update_Action{
		"b/c": pb.Update_CHANGE,
		"b/g": pb.Update_ADD,
		"e/f": pb.Update_REMOVE,
		"h/i": pb.Update_ADD,
	})

	verifyEntries(t, s2.Entries, map[string]expectedEntry{
		"a":   entry("a1"),
		"b/c": entry("c2"),
		"b/d": entry("d1"),
		"b/g": entry("g2"),
		"h/i": entry("i2"),
	})
}

func TestDiffWithEmptyDirectories(t *testing.T) {
	tmpDir := writeTmpFiles(t, map[string]string{
		"a":   "a1",
		"b/c": "c1",
		"b/d": "d1",
	})
	defer os.RemoveAll(tmpDir)

	createDir(t, tmpDir, "e")

	d1, s1, err := diff.Diff(diff.WalkChan(tmpDir, []string{}, 0), diff.SummaryChan(&emptySummary))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d1.Updates, map[string]pb.Update_Action{
		"a":   pb.Update_ADD,
		"b/c": pb.Update_ADD,
		"b/d": pb.Update_ADD,
		"e/":  pb.Update_ADD,
	})

	verifyEntries(t, s1.Entries, map[string]expectedEntry{
		"a":   entry("a1"),
		"b/c": entry("c1"),
		"b/d": entry("d1"),
		"e/":  directory(),
	})

	updateTmpFiles(t, tmpDir, map[string]string{
		"e/f": "f2",
	}, []string{"b/c", "b/d"})

	d2, s2, err := diff.Diff(diff.WalkChan(tmpDir, []string{}, s1.LatestModTime), diff.SummaryChan(s1))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d2.Updates, map[string]pb.Update_Action{
		"b/":  pb.Update_ADD,
		"b/c": pb.Update_REMOVE,
		"b/d": pb.Update_REMOVE,
		"e/":  pb.Update_REMOVE,
		"e/f": pb.Update_ADD,
	})

	verifyEntries(t, s2.Entries, map[string]expectedEntry{
		"a":   entry("a1"),
		"b/":  directory(),
		"e/f": entry("f2"),
	})
}

func TestDiffWithDifferentLatestModTimes(t *testing.T) {
	tmpDir := writeTmpFiles(t, map[string]string{
		"a": "a1",
		"b": "b1",
		"c": "c1",
	})
	defer os.RemoveAll(tmpDir)

	_, s1, err := diff.Diff(diff.WalkChan(tmpDir, nil, 0), diff.SummaryChan(&emptySummary))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	updateTmpFiles(t, tmpDir, map[string]string{
		"b": "b2",
	}, []string{"c"})

	future := time.Now().Add(100 * time.Hour).UnixNano()

	d2, s2, err := diff.Diff(diff.WalkChan(tmpDir, nil, future), diff.SummaryChan(s1))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d2.Updates, map[string]pb.Update_Action{
		"c": pb.Update_REMOVE,
	})

	verifyEntries(t, s2.Entries, map[string]expectedEntry{
		"a": entry("a1"),
		"b": entry("b1"),
	})
}
