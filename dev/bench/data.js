window.BENCHMARK_DATA = {
  "lastUpdate": 1638037487522,
  "repoUrl": "https://github.com/gadget-inc/fsdiff",
  "entries": {
    "fsdiff Benchmark": [
      {
        "commit": {
          "author": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "committer": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "distinct": true,
          "id": "f1c3532aa1f408099315756023fdad6d5f253067",
          "message": "Add a few simple benchmarks and a github action to run them continously in CI",
          "timestamp": "2021-11-27T11:43:11-05:00",
          "tree_id": "f6f48ce7043a5115c5c572ec18df16130d6192a8",
          "url": "https://github.com/gadget-inc/fsdiff/commit/f1c3532aa1f408099315756023fdad6d5f253067"
        },
        "date": 1638031608256,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 472193,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2599524819,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3742571209,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "committer": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "distinct": true,
          "id": "24586b0089f889344dcde43579ef800707aa5710",
          "message": "Switch to godirwalk for a bit better performance\n\n - It doesn't throw errors when trying to stat files that have just been removed\n - It saves us one syscall per ignored file\n - It is more memory efficient\n\nDon't see why not!\n\nOn my machine on `main`:\n\n```\ncd test && go test -bench=. -benchtime=10x\ngoos: darwin\ngoarch: amd64\npkg: github.com/gadget-inc/fsdiff/test\ncpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz\nBenchmarkSimpleInitialDiff-12    \t      10\t    413688 ns/op\nBenchmarkReactInitialDiff-12     \t      10\t2493167343 ns/op\nBenchmarkReactChangedDiff-12     \t      10\t3578962576 ns/op\n```\n\non this branch:\n\n```\ngoos: darwin\ngoarch: amd64\npkg: github.com/gadget-inc/fsdiff/test\ncpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz\nBenchmarkSimpleInitialDiff-12    \t      10\t    742025 ns/op\nBenchmarkReactInitialDiff-12     \t      10\t2632499614 ns/op\nBenchmarkReactChangedDiff-12     \t      10\t3750612520 ns/op\nPASS\n```\n\nDoesn't really seem much faster but isn't slower and saves us one more error condition so I think it's still worth it.",
          "timestamp": "2021-11-27T11:46:13-05:00",
          "tree_id": "4c5aade7e6145a9b97814082a61a964e33995c28",
          "url": "https://github.com/gadget-inc/fsdiff/commit/24586b0089f889344dcde43579ef800707aa5710"
        },
        "date": 1638031773638,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 428204,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2330502086,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3383534417,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "committer": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "distinct": true,
          "id": "02c21fbb62738181c2b520dc046195fdcd43638a",
          "message": "Switch to godirwalk for a bit better performance\n\n - It doesn't throw errors when trying to stat files that have just been removed\n - It saves us one syscall per ignored file\n - It is more memory efficient\n\nDon't see why not!\n\nOn my machine on `main`:\n\n```\ncd test && go test -bench=. -benchtime=10x\ngoos: darwin\ngoarch: amd64\npkg: github.com/gadget-inc/fsdiff/test\ncpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz\nBenchmarkSimpleInitialDiff-12    \t      10\t    413688 ns/op\nBenchmarkReactInitialDiff-12     \t      10\t2493167343 ns/op\nBenchmarkReactChangedDiff-12     \t      10\t3578962576 ns/op\n```\n\non this branch:\n\n```\ngoos: darwin\ngoarch: amd64\npkg: github.com/gadget-inc/fsdiff/test\ncpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz\nBenchmarkSimpleInitialDiff-12    \t      10\t    742025 ns/op\nBenchmarkReactInitialDiff-12     \t      10\t2632499614 ns/op\nBenchmarkReactChangedDiff-12     \t      10\t3750612520 ns/op\nPASS\n```\n\nDoesn't really seem much faster but isn't slower and saves us one more error condition so I think it's still worth it.",
          "timestamp": "2021-11-27T16:48:07Z",
          "tree_id": "59fa9f1928bcf1b33fb2a3293f5553d8e76a87c8",
          "url": "https://github.com/gadget-inc/fsdiff/commit/02c21fbb62738181c2b520dc046195fdcd43638a"
        },
        "date": 1638031890277,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 520330,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2362147189,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3402190366,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "committer": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "distinct": true,
          "id": "58ff5bd705410f796bb675c07f9b6db614cf66e9",
          "message": "Fix a crash where if a file is removed after it's been listed but before it's been hashed we paniced\n\nInstead, the file is gone, we can just not include it in the summary, same as above where we don't include it if we can't stat it",
          "timestamp": "2021-11-27T11:52:08-05:00",
          "tree_id": "056537eb2ab59081cbcfe5c700d9e104e000d18b",
          "url": "https://github.com/gadget-inc/fsdiff/commit/58ff5bd705410f796bb675c07f9b6db614cf66e9"
        },
        "date": 1638032140877,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 387722,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2282026763,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3361207905,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "committer": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "distinct": true,
          "id": "8edc845e57c62e6984c7da1fd79e33561cd931cc",
          "message": "Add a torture concurrency flag",
          "timestamp": "2021-11-27T17:06:30Z",
          "tree_id": "f7030dc0b5013081c34eaf9385b3075681bedd81",
          "url": "https://github.com/gadget-inc/fsdiff/commit/8edc845e57c62e6984c7da1fd79e33561cd931cc"
        },
        "date": 1638032966877,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 498557,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2368503195,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3394111464,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "committer": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "distinct": true,
          "id": "fb92c58ae1db14d22bc8e9f09cd8ebeb5c8cac53",
          "message": "Switch to godirwalk for a bit better performance\n\n - It doesn't throw errors when trying to stat files that have just been removed\n - It saves us one syscall per ignored file\n - It is more memory efficient\n\nDon't see why not!\n\nOn my machine on `main`:\n\n```\ncd test && go test -bench=. -benchtime=10x\ngoos: darwin\ngoarch: amd64\npkg: github.com/gadget-inc/fsdiff/test\ncpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz\nBenchmarkSimpleInitialDiff-12    \t      10\t    413688 ns/op\nBenchmarkReactInitialDiff-12     \t      10\t2493167343 ns/op\nBenchmarkReactChangedDiff-12     \t      10\t3578962576 ns/op\n```\n\non this branch:\n\n```\ngoos: darwin\ngoarch: amd64\npkg: github.com/gadget-inc/fsdiff/test\ncpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz\nBenchmarkSimpleInitialDiff-12    \t      10\t    742025 ns/op\nBenchmarkReactInitialDiff-12     \t      10\t2632499614 ns/op\nBenchmarkReactChangedDiff-12     \t      10\t3750612520 ns/op\nPASS\n```\n\nDoesn't really seem much faster but isn't slower and saves us one more error condition so I think it's still worth it.",
          "timestamp": "2021-11-27T13:20:52-05:00",
          "tree_id": "ed684c07183b3df041a85774a5be9d0f916fb835",
          "url": "https://github.com/gadget-inc/fsdiff/commit/fb92c58ae1db14d22bc8e9f09cd8ebeb5c8cac53"
        },
        "date": 1638037427448,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 446045,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2330732766,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3366147924,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "committer": {
            "email": "harry.brundage@gmail.com",
            "name": "Harry Brundage",
            "username": "airhorns"
          },
          "distinct": true,
          "id": "af94737de3254aac926f9a936d8f6b0ec3ecc4a7",
          "message": "Add a torture concurrency flag",
          "timestamp": "2021-11-27T13:22:20-05:00",
          "tree_id": "289c95aaffef271505647604fb8ff7e2031c6757",
          "url": "https://github.com/gadget-inc/fsdiff/commit/af94737de3254aac926f9a936d8f6b0ec3ecc4a7"
        },
        "date": 1638037487038,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 346936,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2010086935,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 2888821042,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      }
    ]
  }
}