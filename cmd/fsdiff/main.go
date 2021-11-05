package main

import (
	"flag"
	"log"
	"os"
	"path/filepath"
	"runtime/pprof"
	"strings"

	"github.com/gadget-inc/fsdiff/pkg/diff"
)

type cliArgs struct {
	dir     string
	sum     string
	out     string
	prof    string
	ignores []string
}

func parseArgs() *cliArgs {
	dir := flag.String("dir", "", "The directory that will be diffed (required)")
	sum := flag.String("sum", "", "A directory summary from a previous run")
	out := flag.String("out", "", "Output path, the new summary and diff will be written here")
	prof := flag.String("prof", "", "Output CPU profile to this path")
	ignores := flag.String("ignores", "", "Comma separated list of paths to ignore")

	flag.Parse()

	if *dir == "" {
		log.Fatal("-dir required")
	}

	parsedIgnores := strings.Split(*ignores, ",")
	for idx, ignore := range parsedIgnores {
		parsedIgnores[idx] = strings.TrimSpace(ignore)
	}

	return &cliArgs{
		dir:     *dir,
		sum:     *sum,
		out:     *out,
		prof:    *prof,
		ignores: parsedIgnores,
	}
}

func main() {
	args := parseArgs()

	if args.prof != "" {
		file, err := os.Create(args.prof)
		if err != nil {
			log.Fatalf("open pprof file %v: %v", file, err)
		}
		pprof.StartCPUProfile(file)
		defer pprof.StopCPUProfile()
	}

	if args.out != "" {
		err := os.MkdirAll(args.out, 0755)
		if err != nil {
			log.Fatalf("create output directory %v: %v", args.out, err)
		}
	}

	d, s, err := diff.Diff(diff.WalkChan(args.dir, args.ignores), diff.SummaryChan(args.sum))
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
