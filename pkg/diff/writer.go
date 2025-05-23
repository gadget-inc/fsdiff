package diff

import (
	"bytes"
	"io"
	"os"

	"github.com/gadget-inc/fsdiff/pkg/pb"
	"github.com/klauspost/compress/s2"
	"google.golang.org/protobuf/proto"
)

func writeBytes(path string, data []byte) error {
	file, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	s2Writer := s2.NewWriter(file)
	defer s2Writer.Close()

	_, err = io.Copy(s2Writer, bytes.NewBuffer(data))
	return err
}

func WriteSummary(path string, sum *pb.Summary) error {
	data, err := proto.Marshal(sum)
	if err != nil {
		return err
	}
	return writeBytes(path, data)
}

func WriteDiff(path string, diff *pb.Diff) error {
	data, err := proto.Marshal(diff)
	if err != nil {
		return err
	}
	return writeBytes(path, data)
}
