package test

import (
	"log"
	"os"
	"path/filepath"
	"testing"

	"github.com/gadget-inc/fsdiff/pkg/diff"
	"github.com/gadget-inc/fsdiff/pkg/pb"
)

func getFixturesDir(name string) string {
	var cwd, err = os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	return filepath.Join(cwd, "fixtures", name)
}

func BenchmarkSimpleInitialDiff(b *testing.B) {
	dir := getFixturesDir("simple")

	for n := 0; n < b.N; n++ {
		_, _, err := diff.Diff(diff.WalkChan(dir, []string{}), diff.SummaryChan(&pb.Summary{}))
		if err != nil {
			b.Fatalf("failed to run diff: %v", err)
		}
	}
}

func BenchmarkReactInitialDiff(b *testing.B) {
	dir := getFixturesDir("example-react-app")

	for n := 0; n < b.N; n++ {
		_, _, err := diff.Diff(diff.WalkChan(dir, []string{}), diff.SummaryChan(&pb.Summary{}))
		if err != nil {
			b.Fatalf("failed to run diff: %v", err)
		}
	}
}

func BenchmarkReactChangedDiff(b *testing.B) {
	initialDir := getFixturesDir("example-react-app")
	_, summary, err := diff.Diff(diff.WalkChan(initialDir, []string{}), diff.SummaryChan(&pb.Summary{}))
	if err != nil {
		b.Fatalf("failed to run diff: %v", err)
	}

	changedDir := getFixturesDir("example-react-app-libraries")

	for n := 0; n < b.N; n++ {
		_, _, err := diff.Diff(diff.WalkChan(changedDir, []string{}), diff.SummaryChan(summary))
		if err != nil {
			b.Fatalf("failed to run diff: %v", err)
		}
	}
}
