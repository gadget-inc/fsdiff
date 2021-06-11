PKG_GO_FILES := $(shell find pkg/ -type f -name '*.go')

.PHONY: build

pkg/pb/%.pb.go: pkg/pb/%.proto
	protoc --experimental_allow_proto3_optional --go_out=. --go_opt=paths=source_relative $^

bin/%: cmd/%/main.go $(PKG_GO_FILES)
	go build -o $@ $<

build: pkg/pb/diff.pb.go pkg/pb/summary.pb.go  bin/fsdiff bin/debug
