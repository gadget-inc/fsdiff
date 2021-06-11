package main

import (
	"flag"
	"log"
	"path/filepath"

	"github.com/angelini/fsdiff/pkg/diff"
	"github.com/angelini/fsdiff/pkg/pb"
)

type cliArgs struct {
	sum    string
	diff   string
	sample int
}

func parseArgs() *cliArgs {
	sum := flag.String("sum", "", "Path to a summary file")
	diff := flag.String("diff", "", "Path to a diff file")
	sample := flag.Int("sample", 10, "Amount of entries to sample")

	flag.Parse()

	return &cliArgs{
		sum:    *sum,
		diff:   *diff,
		sample: *sample,
	}
}

func main() {
	args := parseArgs()

	if args.sum != "" {
		summary, err := diff.ReadSummary(args.sum)
		if err != nil {
			log.Fatalf("read summary file %v: %v", args.sum, err)
		}

		log.Print("")
		log.Print("=== Summary ===")
		log.Printf("created at: %v", summary.CreatedAt)
		log.Printf("total entries: %v", len(summary.Entries))
		log.Print("")

		for i := 0; i < args.sample && i < len(summary.Entries); i++ {
			entry := summary.Entries[i]
			log.Printf("%v: path:%v mode:%v", i, filepath.Join(entry.RelativeDir, entry.Name), entry.Mode)
		}
	}

	if args.diff != "" {
		diff, err := diff.ReadDiff(args.diff)
		if err != nil {
			log.Fatalf("read diff file %v: %v", args.sum, err)
		}

		log.Print("")
		log.Print("=== Diff ===")
		log.Printf("created at: %v", diff.CreatedAt)
		log.Printf("total updates: %v", len(diff.Updates))
		log.Print("")

		for i := 0; i < args.sample && i < len(diff.Updates); i++ {
			update := diff.Updates[i]

			switch update.Action {
			case pb.Update_ADD:
				log.Printf("%v: action:ADD path:%v", i, update.Path)
			case pb.Update_CHANGE:
				log.Printf("%v: action:CHANGE path:%v", i, update.Path)
			case pb.Update_REMOVE:
				log.Printf("%v: action:REMOVE path:%v", i, update.Path)
			}
		}
	}
}
