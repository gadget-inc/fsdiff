package debug

import (
	"fmt"

	"github.com/gadget-inc/fsdiff/pkg/pb"
)

func PrintSummarySummary(summary *pb.Summary) {
	fmt.Println("=== Summary ===")
	fmt.Printf("created at:    %v\n", summary.CreatedAt)
	fmt.Printf("total entries: %v\n", len(summary.Entries))
}

func PrintDiffSummary(diff *pb.Diff) {
	fmt.Println("=== Diff ===")
	fmt.Printf("created at:    %v\n", diff.CreatedAt)
	fmt.Printf("total updates: %v\n", len(diff.Updates))
}
