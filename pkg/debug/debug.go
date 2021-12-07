package debug

import (
	"fmt"

	"github.com/gadget-inc/fsdiff/pkg/pb"
)

func PrintSummarySummary(summary *pb.Summary) {
	fmt.Println("=== Summary ===")
	fmt.Printf("latest mod time:    %v\n", summary.LatestModTime)
	fmt.Printf("total entries: %v\n", len(summary.Entries))
}

func PrintDiffSummary(diff *pb.Diff) {
	fmt.Println("=== Diff ===")
	fmt.Printf("total updates: %v\n", len(diff.Updates))
}
