package debug

import (
	"fmt"

	"github.com/gadget-inc/fsdiff/pkg/pb"
)

func PrintSummarySummary(summary *pb.Summary) {
	hashedCount := 0

	for _, entry := range summary.Entries {
		if entry.Hash != nil {
			hashedCount += 1
		}
	}

	fmt.Println("=== Summary ===")
	fmt.Printf("latest mod time:    %v\n", summary.LatestModTime)
	fmt.Printf("total entries: %v\n", len(summary.Entries))

	if len(summary.Entries) > 0 {
		fmt.Printf("hashed entries: %v (%.2f%%)\n", hashedCount, float32(hashedCount)/float32(len(summary.Entries))*100)
	}
}

func PrintDiffSummary(diff *pb.Diff) {
	fmt.Println("=== Diff ===")
	fmt.Printf("total updates: %v\n", len(diff.Updates))
}
