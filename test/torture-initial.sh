#!/usr/bin/env bash
set -euox pipefail

target_dir=$(mktemp -d)
state_dir=

trap "exit" INT TERM
trap "kill 0" EXIT
go run ./cmd/folder-torture/main.go -dir "$target_dir" > /dev/null 2>&1 &

while true; do
  # repeatedly initialize the state while it is changing
  go run cmd/fsdiff/main.go -dir "$target_dir" -out $(mktemp -d) -verbose
done