package main

import (
	"encoding/hex"
	"flag"
	"fmt"
	"log"

	"github.com/gadget-inc/fsdiff/pkg/diff"
	"github.com/gadget-inc/fsdiff/pkg/pb"
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

		fmt.Println("")
		fmt.Println("=== Summary ===")
		fmt.Printf("created at:    %v\n", summary.CreatedAt)
		fmt.Printf("total entries: %v\n", len(summary.Entries))
		fmt.Println("")

		for i := 0; i < args.sample && i < len(summary.Entries); i++ {
			entry := summary.Entries[i]
			fmt.Printf("%v: path:%v mode:%v hash:%v...\n", i, entry.Path, entry.Mode, hex.EncodeToString(entry.Hash)[:12])
		}
	}

	if args.diff != "" {
		diff, err := diff.ReadDiff(args.diff)
		if err != nil {
			log.Fatalf("read diff file %v: %v", args.sum, err)
		}

		fmt.Println("")
		fmt.Println("=== Diff ===")
		fmt.Printf("created at:    %v\n", diff.CreatedAt)
		fmt.Printf("total updates: %v\n", len(diff.Updates))
		fmt.Println("")

		for i := 0; i < args.sample && i < len(diff.Updates); i++ {
			update := diff.Updates[i]

			switch update.Action {
			case pb.Update_ADD:
				fmt.Printf("%v: action:ADD path:%v\n", i, update.Path)
			case pb.Update_CHANGE:
				fmt.Printf("%v: action:CHANGE path:%v\n", i, update.Path)
			case pb.Update_REMOVE:
				fmt.Printf("%v: action:REMOVE path:%v\n", i, update.Path)
			}
		}
	}
}
