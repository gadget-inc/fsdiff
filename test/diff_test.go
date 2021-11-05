package test

import (
	"bytes"
	"crypto/sha256"
	"os"
	"path/filepath"
	"testing"

	"github.com/gadget-inc/fsdiff/pkg/diff"
	"github.com/gadget-inc/fsdiff/pkg/pb"
)

func writeTmpFiles(t *testing.T, files map[string]string) string {
	dir, err := os.MkdirTemp("", "dateilager_tests_")
	if err != nil {
		t.Fatal("cannot create tmp dir")
	}

	for name, content := range files {
		err = os.WriteFile(filepath.Join(dir, name), []byte(content), 0755)
		if err != nil {
			t.Fatalf("write temp file: %v", err)
		}
	}

	return dir
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

func verifyEntries(t *testing.T, actual []*pb.Entry, expected map[string]expectedEntry) {
	if len(actual) != len(expected) {
		t.Errorf("mismatch entries count, expected %v, got: %v", len(expected), len(actual))
	}

	for _, entry := range actual {
		if exp, ok := expected[entry.Path]; ok {
			if !bytes.Equal(entry.Hash, exp.hash[:]) {
				t.Errorf("mismatch entry hash for %v, expected: %v, got: %v", entry.Path, exp.hash, entry.Hash)
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

	d, s, err := diff.Diff(diff.WalkChan(tmpDir, nil), diff.SummaryChan(""))
	if err != nil {
		t.Fatalf("failed to run diff: %v", err)
	}

	verifyUpdates(t, d.Updates, map[string]pb.Update_Action{
		"a": pb.Update_ADD,
		"b": pb.Update_ADD,
		"c": pb.Update_ADD,
	})

	verifyEntries(t, s.Entries, map[string]expectedEntry{
		"a": entry("a1"),
		"b": entry("b1"),
		"c": entry("c1"),
	})
}
