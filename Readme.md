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

This will produce `sum.s2` and `diff.s2`. The diff file contains a list of all files that have been added, removed or changed.

Update the example directory and run the `fsdiff` again.

```bash
$ echo "new" > example/new
$ bin/fsdiff -dir example -sum sum.s2
```

To read the contents of these files, use the included `debug` tool.

```bash
$ bin/debug -sum sum.s2 -diff diff.s2

=== Summary ===
created at:    1623436045
total entries: 4

0: path:a mode:420 hash:87428fc52280...
1: path:b mode:420 hash:0263829989b6...
2: path:c mode:420 hash:a3a5e715f0cc...
3: path:new mode:420 hash:7aa7a5359173...

=== Diff ===
created at:    1623436045
total updates: 1

0: action:ADD path:new
```

## Benchmarks

Find 'em here: https://gadget-inc.github.io/fsdiff/dev/bench/
