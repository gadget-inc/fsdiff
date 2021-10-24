package diff

import (
	"bytes"
	"io"
	"os"

	"github.com/gadget-inc/fsdiff/pkg/pb"
	"github.com/klauspost/compress/s2"
	"google.golang.org/protobuf/proto"
)

func readBytes(path string) ([]byte, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	s2Reader := s2.NewReader(file)

	var buffer bytes.Buffer

	_, err = io.Copy(&buffer, s2Reader)
	if err != nil {
		return nil, err
	}

	return buffer.Bytes(), nil
}

func ReadSummary(path string) (*pb.Summary, error) {
	var summary pb.Summary

	data, err := readBytes(path)
	if err != nil {
		return nil, err
	}

	err = proto.Unmarshal(data, &summary)
	if err != nil {
		return nil, err
	}

	return &summary, nil
}

func ReadDiff(path string) (*pb.Diff, error) {
	var diff pb.Diff

	data, err := readBytes(path)
	if err != nil {
		return nil, err
	}

	err = proto.Unmarshal(data, &diff)
	if err != nil {
		return nil, err
	}

	return &diff, nil
}
