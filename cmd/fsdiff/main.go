package main

import (
	"flag"
	"log"
	"os"
	"path/filepath"

	"github.com/angelini/fsdiff/pkg/diff"
	"google.golang.org/protobuf/proto"
)

type cliArgs struct {
	dir string
	sum string
	out string
}

func parseArgs() *cliArgs {
	dir := flag.String("dir", "", "The directory that will be diffed")
	sum := flag.String("sum", "", "A directory summary from a previous run")
	out := flag.String("out", "", "Output path, the new summary and diff will be written here")

	flag.Parse()

	if *dir == "" {
		log.Fatal("-dir required")
	}

	return &cliArgs{
		dir: *dir,
		sum: *sum,
		out: *out,
	}
}

func main() {
	args := parseArgs()

	diff, newSummary, err := diff.Diff(diff.WalkChan(args.dir), diff.SummaryChan(args.sum))
	if err != nil {
		log.Fatalf("scan for diffs: %v", err)
	}

	diffBytes, err := proto.Marshal(diff)
	if err != nil {
		log.Fatalf("marshal diff: %v", err)
	}

	newSummaryBytes, err := proto.Marshal(newSummary)
	if err != nil {
		log.Fatalf("marshal new summary: %v", err)
	}

	err = os.WriteFile(filepath.Join(args.out, "example_diff"), diffBytes, 0666)
	if err != nil {
		log.Fatalf("write diff: %v", err)
	}

	err = os.WriteFile(filepath.Join(args.out, "example_sum"), newSummaryBytes, 0666)
	if err != nil {
		log.Fatalf("write new summary: %v", err)
	}
}
