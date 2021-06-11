package main

import (
	"flag"
	"log"
	"path/filepath"

	"github.com/angelini/fsdiff/pkg/diff"
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

	d, s, err := diff.Diff(diff.WalkChan(args.dir), diff.SummaryChan(args.sum))
	if err != nil {
		log.Fatalf("execute diff: %v", err)
	}

	err = diff.WriteSummary(filepath.Join(args.out, "sum.zst"), s)
	if err != nil {
		log.Fatalf("write diff to disk: %v", err)
	}

	err = diff.WriteDiff(filepath.Join(args.out, "diff.zst"), d)
	if err != nil {
		log.Fatalf("write summary to disk: %v", err)
	}
}
