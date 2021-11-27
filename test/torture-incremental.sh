#!/usr/bin/env bash
set -euox pipefail

target_dir=$(mktemp -d)
state_dir=$(mktemp -d)

trap "exit" INT TERM
trap "kill 0" EXIT
go run ./cmd/folder-torture/main.go -dir "$target_dir" > /dev/null 2>&1 &

# run an initial diff to setup the state
go run cmd/fsdiff/main.go -dir "$target_dir" -out "$state_dir" -verbose

while true; do
  # run a diff in a loop
  go run cmd/fsdiff/main.go -dir "$target_dir" -out "$state_dir" -sum $state_dir/sum.s2 -verbose
done