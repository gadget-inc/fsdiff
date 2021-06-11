# FS Diff

A tool to summarize a directory and then compare it at a later date to that summary.

## Build

This tool requires the Go 1.16 toolchain to be installed locally.

```bash
$ make build
```

## Run

Begin by summarizing an existing directory:

```bash
$ bin/fsdiff -dir example
```

This will produce `sum.zst` and `diff.zst`. The diff file contains a list of all files that have been added, removed or changed.

Update the example directory and run the `fsdiff` again.

```bash
$ echo "new" > example/new
$ bin/fsdiff -dir example -sum sum.zst
```

To read the contents of these files, use the included `debug` tool.

```bash
$ bin/debug -sum sum.zst -diff diff.zst

2021/06/11 12:26:45 === Summary ===
2021/06/11 12:26:45 created at: 1623407202
2021/06/11 12:26:45 total entries: 4
2021/06/11 12:26:45
2021/06/11 12:26:45 0: path:a mode:420
2021/06/11 12:26:45 1: path:b mode:420
2021/06/11 12:26:45 2: path:c mode:420
2021/06/11 12:26:45 3: path:new mode:420
2021/06/11 12:26:45
2021/06/11 12:26:45 === Diff ===
2021/06/11 12:26:45 created at: 1623407202
2021/06/11 12:26:45 total updates: 1
2021/06/11 12:26:45
2021/06/11 12:26:45 0: action:ADD path:new
```
