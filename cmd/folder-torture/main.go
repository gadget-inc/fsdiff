package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
)

type cliArgs struct {
	dir string
}

func parseArgs() *cliArgs {
	dir := flag.String("dir", "", "The directory that will be diffed (required)")

	flag.Parse()

	if *dir == "" {
		log.Fatal("-dir required")
	}

	return &cliArgs{
		dir: *dir,
	}
}

func doRandomFileOperation(dir string) {
	choice := rand.Intn(10)
	switch {
	// make some new files
	case choice < 5:
		segmentCount := rand.Intn(3) + 2
		segments := make([]string, segmentCount+1)
		segments[0] = dir

		for i := 1; i <= segmentCount; i++ {
			segments[i] = fmt.Sprintf("%v", rand.Intn(5))
		}

		fileDir := filepath.Join(segments...)
		err := os.MkdirAll(fileDir, os.ModePerm)
		if err != nil {
			log.Printf("failed to create all directories: %v", err)
			return
		}

		fileName := filepath.Join(fileDir, fmt.Sprintf("%v", rand.Intn(100)+1)+".txt")

		err = os.WriteFile(fileName, []byte("test file"), 0755)
		if err != nil {
			log.Printf("write tmp file failed %v: %v", fileName, err)
			return
		}
		log.Printf("made file", fileName)

	// move a directory
	case choice < 8:
		files, err := ioutil.ReadDir(dir)
		if err != nil {
			log.Fatalf("failed to list files in directory: %v", err)
		}
		if len(files) == 0 {
			return
		}
		oldName := filepath.Join(dir, files[rand.Intn(len(files))].Name())
		newName := filepath.Join(dir, fmt.Sprintf("%v", rand.Intn(5)))

		os.Rename(oldName, newName)
		log.Printf("renamed file from %v to %v", oldName, newName)

	// remove a directory
	case choice < 10:
		files, err := ioutil.ReadDir(dir)
		if err != nil {
			log.Fatalf("failed to list files in directory: %v", err)
		}
		if len(files) == 0 {
			return
		}
		name := filepath.Join(dir, files[rand.Intn(len(files))].Name())
		os.RemoveAll(name)
		log.Printf("removed %v", name)
	}
}

func torture(dir string) {
	for {
		doRandomFileOperation(dir)
	}
}

func main() {
	args := parseArgs()

	go torture(args.dir)
	go torture(args.dir)
	go torture(args.dir)

	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	<-sigs
}
