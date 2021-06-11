package main

import (
	"flag"
	"io/ioutil"
	"log"

	"github.com/angelini/fsdiff/pkg/pb"
	"google.golang.org/protobuf/proto"
)

type cliArgs struct {
	sum  string
	diff string
}

func parseArgs() *cliArgs {
	sum := flag.String("sum", "", "Path to a summary file")
	diff := flag.String("diff", "", "Path to a diff file")

	flag.Parse()

	return &cliArgs{
		sum:  *sum,
		diff: *diff,
	}
}

func main() {
	args := parseArgs()

	if args.sum != "" {
		file, err := ioutil.ReadFile(args.sum)
		if err != nil {
			log.Fatalf("read summary file %v: %v", args.sum, err)
		}

		var summary pb.Summary
		err = proto.Unmarshal(file, &summary)
		if err != nil {
			log.Fatalf("unmarshal summary: %v", err)
		}

		log.Printf("summary: %v", &summary)
	}

	if args.diff != "" {
		file, err := ioutil.ReadFile(args.diff)
		if err != nil {
			log.Fatalf("read diff file %v: %v", args.sum, err)
		}

		var diff pb.Diff
		err = proto.Unmarshal(file, &diff)
		if err != nil {
			log.Fatalf("unmarshal diff: %v", err)
		}

		log.Printf("diff: %v", &diff)
	}
}
