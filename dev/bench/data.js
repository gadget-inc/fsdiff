window.BENCHMARK_DATA = {
  "lastUpdate": 1640876521802,
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
          "id": "f5fa9f6f1b01c3f80583d31140bcc352507050b2",
          "message": "Add an initial state torturer and remove the make entry for less noise",
          "timestamp": "2021-11-27T18:40:49Z",
          "tree_id": "e0ce8313b51648e62a47f892a4e303c81bb78304",
          "url": "https://github.com/gadget-inc/fsdiff/commit/f5fa9f6f1b01c3f80583d31140bcc352507050b2"
        },
        "date": 1638038613436,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 448143,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2307349312,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3342743942,
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
          "id": "c2b2e82195575d6efe69ca937afd901f3b634db0",
          "message": "Fix a crash where if a file is removed while walking directories we paniced",
          "timestamp": "2021-11-27T18:43:01Z",
          "tree_id": "290d4a3979b50e9ab0c59ecf7d1aeb8134d6febb",
          "url": "https://github.com/gadget-inc/fsdiff/commit/c2b2e82195575d6efe69ca937afd901f3b634db0"
        },
        "date": 1638038784518,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 761701,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2223654873,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3323632620,
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3f1aeee5b6629c833133897c0f438492f5c41966",
          "message": "Merge pull request #6 from gadget-inc/torture\n\nAdd a torture-er and fix two crashes it identified",
          "timestamp": "2021-11-27T13:52:01-05:00",
          "tree_id": "290d4a3979b50e9ab0c59ecf7d1aeb8134d6febb",
          "url": "https://github.com/gadget-inc/fsdiff/commit/3f1aeee5b6629c833133897c0f438492f5c41966"
        },
        "date": 1638039290930,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 413883,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2341377396,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3379165881,
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "17196760007314972934ee809d6ec4ab8b95e7e3",
          "message": "Merge pull request #3 from gadget-inc/continuous-bench\n\nAdd a few simple benchmarks and a github action to run them continously in CI",
          "timestamp": "2021-11-27T13:52:22-05:00",
          "tree_id": "290d4a3979b50e9ab0c59ecf7d1aeb8134d6febb",
          "url": "https://github.com/gadget-inc/fsdiff/commit/17196760007314972934ee809d6ec4ab8b95e7e3"
        },
        "date": 1638039322639,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 466078,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2374414384,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3354449159,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "committer": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "distinct": true,
          "id": "2a9d8bf5554bd57dbecbd213944022a00b95a7f0",
          "message": "Add GoReleaser",
          "timestamp": "2021-11-27T15:20:05-05:00",
          "tree_id": "63ab8f9f3751083c5bbb318c97f6eb360fed96f2",
          "url": "https://github.com/gadget-inc/fsdiff/commit/2a9d8bf5554bd57dbecbd213944022a00b95a7f0"
        },
        "date": 1638044560642,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 351632,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 1983322014,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 2878942314,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "committer": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "distinct": true,
          "id": "b7b0dccb2dccb8279ba636f4a118d4ca0915bce4",
          "message": "Add GoReleaser",
          "timestamp": "2021-11-27T15:21:43-05:00",
          "tree_id": "73b62d9191895b16741f885791a5375ac0eab026",
          "url": "https://github.com/gadget-inc/fsdiff/commit/b7b0dccb2dccb8279ba636f4a118d4ca0915bce4"
        },
        "date": 1638044694235,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 424915,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2379273184,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3433533544,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "committer": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "distinct": true,
          "id": "266d33ee65cc67248e9633d6a3871639b4502d88",
          "message": "Add GoReleaser",
          "timestamp": "2021-11-27T15:52:06-05:00",
          "tree_id": "4d22750f2865743dd8135cdad353fa29885e20f0",
          "url": "https://github.com/gadget-inc/fsdiff/commit/266d33ee65cc67248e9633d6a3871639b4502d88"
        },
        "date": 1638061902139,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 414769,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2358444280,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3437420079,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c6007f74ad534cffb2e299e7f0343371bdff632c",
          "message": "Merge pull request #7 from gadget-inc/add-goreleaser\n\nAdd GoReleaser",
          "timestamp": "2021-11-29T11:32:17+01:00",
          "tree_id": "4d22750f2865743dd8135cdad353fa29885e20f0",
          "url": "https://github.com/gadget-inc/fsdiff/commit/c6007f74ad534cffb2e299e7f0343371bdff632c"
        },
        "date": 1638182103755,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 464050,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2379874240,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3427514086,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "f03e43a3210fd2cba98e6c777ba6d6701200bff5",
          "message": "Skip directory listing if it's marked as missing",
          "timestamp": "2021-11-29T11:42:03+01:00",
          "tree_id": "23ca00e84b88536e9bfc72907e032d213f16b996",
          "url": "https://github.com/gadget-inc/fsdiff/commit/f03e43a3210fd2cba98e6c777ba6d6701200bff5"
        },
        "date": 1638182693737,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 440443,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2487516911,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3574805292,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "f03e43a3210fd2cba98e6c777ba6d6701200bff5",
          "message": "Skip directory listing if it's marked as missing",
          "timestamp": "2021-11-29T11:42:03+01:00",
          "tree_id": "23ca00e84b88536e9bfc72907e032d213f16b996",
          "url": "https://github.com/gadget-inc/fsdiff/commit/f03e43a3210fd2cba98e6c777ba6d6701200bff5"
        },
        "date": 1638182729032,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 436990,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2541884712,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3633251519,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "d8b63c8114290295acc80ca71962bb0c72a6a4a2",
          "message": "Remove arm64 builds",
          "timestamp": "2021-11-29T11:45:24+01:00",
          "tree_id": "2d40ce6dccb7dd9814d2eabe313ac2d9dd2782ed",
          "url": "https://github.com/gadget-inc/fsdiff/commit/d8b63c8114290295acc80ca71962bb0c72a6a4a2"
        },
        "date": 1638182842210,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 132329,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 785280837,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 1129023913,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": false,
          "id": "d8b63c8114290295acc80ca71962bb0c72a6a4a2",
          "message": "Remove arm64 builds",
          "timestamp": "2021-11-29T11:45:24+01:00",
          "tree_id": "2d40ce6dccb7dd9814d2eabe313ac2d9dd2782ed",
          "url": "https://github.com/gadget-inc/fsdiff/commit/d8b63c8114290295acc80ca71962bb0c72a6a4a2"
        },
        "date": 1638182899329,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 391712,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2359164139,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3402807294,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "20ecb900ee210baa681e5bd4f5313d4beec142d3",
          "message": "Add main to the goreleaser config",
          "timestamp": "2021-11-29T11:52:32+01:00",
          "tree_id": "ca38251e17f90e902170bc611cccb8182488b57d",
          "url": "https://github.com/gadget-inc/fsdiff/commit/20ecb900ee210baa681e5bd4f5313d4beec142d3"
        },
        "date": 1638183317233,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 352464,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 1999454182,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 2900173827,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "committer": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "distinct": true,
          "id": "c20a7796504f2c65037708ae280dda7f75bede9a",
          "message": "Fix GoReleaser\n\nUse the action to install the binary and run goreleaser inside of a nix\nshell.",
          "timestamp": "2021-11-29T12:10:23-05:00",
          "tree_id": "56413fa59a1b70aeae7344cd46fc54cbe1cbd45b",
          "url": "https://github.com/gadget-inc/fsdiff/commit/c20a7796504f2c65037708ae280dda7f75bede9a"
        },
        "date": 1638205994637,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 399162,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2273237414,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3297318668,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "committer": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "distinct": true,
          "id": "47119f3f71f42c2a7ab72551e7f9c651e2cfa846",
          "message": "Fix GoReleaser\n\nUse the action to install the binary and run goreleaser inside of a nix\nshell.",
          "timestamp": "2021-11-29T12:12:58-05:00",
          "tree_id": "8783efc73d96560b790bd8d921046c32fb0e1816",
          "url": "https://github.com/gadget-inc/fsdiff/commit/47119f3f71f42c2a7ab72551e7f9c651e2cfa846"
        },
        "date": 1638206121263,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 320655,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 1907539103,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 2776687349,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "committer": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "distinct": true,
          "id": "a4b4722f78504f81224d1c975153ec235cbb1dec",
          "message": "Fix GoReleaser\n\nUse the action to install the binary and run goreleaser inside of a nix\nshell.",
          "timestamp": "2021-11-30T10:00:19-05:00",
          "tree_id": "761384ba42078f690956ecedcc274ce96fa9a329",
          "url": "https://github.com/gadget-inc/fsdiff/commit/a4b4722f78504f81224d1c975153ec235cbb1dec"
        },
        "date": 1638284603324,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 455244,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2391248249,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3574203828,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "committer": {
            "email": "arbourd@users.noreply.github.com",
            "name": "Dylan Arbour",
            "username": "arbourd"
          },
          "distinct": true,
          "id": "45eae448d5e5e73583f695b8cdbba496a981dbca",
          "message": "Fix GoReleaser\n\nUse the action to install the binary and run goreleaser inside of a nix\nshell.",
          "timestamp": "2021-11-30T10:30:21-05:00",
          "tree_id": "9b28df0767f7b3e3e20ec12dceafc55436cbdea4",
          "url": "https://github.com/gadget-inc/fsdiff/commit/45eae448d5e5e73583f695b8cdbba496a981dbca"
        },
        "date": 1638286378313,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 354820,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 1984979771,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 2875652320,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fc1157a0bfe3d9923ff087b2e7c419be3e3398c1",
          "message": "Merge pull request #8 from gadget-inc/fix-goreleaser\n\nFix GoReleaser",
          "timestamp": "2021-11-30T17:02:18+01:00",
          "tree_id": "9b28df0767f7b3e3e20ec12dceafc55436cbdea4",
          "url": "https://github.com/gadget-inc/fsdiff/commit/fc1157a0bfe3d9923ff087b2e7c419be3e3398c1"
        },
        "date": 1638288302960,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 352041,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2197097038,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3452907296,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "928264163c3f5f3da74995969763825fc9c5214f",
          "message": "Log slow to process files",
          "timestamp": "2021-11-30T17:06:13+01:00",
          "tree_id": "b593e067c20de465b8176ff4bf1c872b83b0ecca",
          "url": "https://github.com/gadget-inc/fsdiff/commit/928264163c3f5f3da74995969763825fc9c5214f"
        },
        "date": 1638288538366,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 376355,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 1986876070,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 2876296591,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "928264163c3f5f3da74995969763825fc9c5214f",
          "message": "Log slow to process files",
          "timestamp": "2021-11-30T17:06:13+01:00",
          "tree_id": "b593e067c20de465b8176ff4bf1c872b83b0ecca",
          "url": "https://github.com/gadget-inc/fsdiff/commit/928264163c3f5f3da74995969763825fc9c5214f"
        },
        "date": 1638288544277,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 412876,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2287657570,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3295815825,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "9ddfa799c0d2ba493f0597e6c8793b8b7d3a300a",
          "message": "Remove protoc call from go releaser",
          "timestamp": "2021-11-30T18:01:37+01:00",
          "tree_id": "056108a837d47a59b9bbb7cddc8dcd6de7d90b5d",
          "url": "https://github.com/gadget-inc/fsdiff/commit/9ddfa799c0d2ba493f0597e6c8793b8b7d3a300a"
        },
        "date": 1638291861501,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 520941,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2448839913,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3501796000,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "9ddfa799c0d2ba493f0597e6c8793b8b7d3a300a",
          "message": "Remove protoc call from go releaser",
          "timestamp": "2021-11-30T18:01:37+01:00",
          "tree_id": "056108a837d47a59b9bbb7cddc8dcd6de7d90b5d",
          "url": "https://github.com/gadget-inc/fsdiff/commit/9ddfa799c0d2ba493f0597e6c8793b8b7d3a300a"
        },
        "date": 1638291899248,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 751698,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2437061348,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 3460785433,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "407a3d139538cf75bbc5dc60d7681ec67949bc59",
          "message": "Skip hashing files if the mod time is before the last summary",
          "timestamp": "2021-12-07T18:16:59+01:00",
          "tree_id": "455273e2d904fc66942969b82003cca7f4548778",
          "url": "https://github.com/gadget-inc/fsdiff/commit/407a3d139538cf75bbc5dc60d7681ec67949bc59"
        },
        "date": 1638897545559,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 362804,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2025061964,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 646637047,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "ef83b3f123fba0dec54ce043db0e040f857b8d69",
          "message": "Skip hashing files if the mod time is before the last summary",
          "timestamp": "2021-12-09T17:41:18+01:00",
          "tree_id": "1853ca5b13265900ebe40b42774b5fffdef524f8",
          "url": "https://github.com/gadget-inc/fsdiff/commit/ef83b3f123fba0dec54ce043db0e040f857b8d69"
        },
        "date": 1639068198756,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 343874,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2014728228,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 647727072,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4906fd3fcd7468aeb42fc9ea3e2ca974d944ca34",
          "message": "Merge pull request #9 from gadget-inc/mtime_optimization\n\nSkip hashing files if the mod time is before the last summary",
          "timestamp": "2021-12-09T11:45:57-05:00",
          "tree_id": "1853ca5b13265900ebe40b42774b5fffdef524f8",
          "url": "https://github.com/gadget-inc/fsdiff/commit/4906fd3fcd7468aeb42fc9ea3e2ca974d944ca34"
        },
        "date": 1639068472517,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 297092,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 1799264380,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 594558494,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4906fd3fcd7468aeb42fc9ea3e2ca974d944ca34",
          "message": "Merge pull request #9 from gadget-inc/mtime_optimization\n\nSkip hashing files if the mod time is before the last summary",
          "timestamp": "2021-12-09T11:45:57-05:00",
          "tree_id": "1853ca5b13265900ebe40b42774b5fffdef524f8",
          "url": "https://github.com/gadget-inc/fsdiff/commit/4906fd3fcd7468aeb42fc9ea3e2ca974d944ca34"
        },
        "date": 1639068571395,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 481133,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2488459237,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 819200298,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4906fd3fcd7468aeb42fc9ea3e2ca974d944ca34",
          "message": "Merge pull request #9 from gadget-inc/mtime_optimization\n\nSkip hashing files if the mod time is before the last summary",
          "timestamp": "2021-12-09T11:45:57-05:00",
          "tree_id": "1853ca5b13265900ebe40b42774b5fffdef524f8",
          "url": "https://github.com/gadget-inc/fsdiff/commit/4906fd3fcd7468aeb42fc9ea3e2ca974d944ca34"
        },
        "date": 1639288809300,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 359120,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 2011119295,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 642828740,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "d72ced45be291487128c0d144b59f76887a7f923",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-27T21:38:46+01:00",
          "tree_id": "31e738ca2af71e9fd93059e93693dc50df618444",
          "url": "https://github.com/gadget-inc/fsdiff/commit/d72ced45be291487128c0d144b59f76887a7f923"
        },
        "date": 1640637638252,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 205821,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 297430730,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 433502548,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "006b30b120ac45ab3d8e002dd7ee0128d411e858",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-27T21:46:20+01:00",
          "tree_id": "a998ef62899ba88f5d0cdf085cbad26f4764f32c",
          "url": "https://github.com/gadget-inc/fsdiff/commit/006b30b120ac45ab3d8e002dd7ee0128d411e858"
        },
        "date": 1640638075739,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 203202,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 290428147,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 444162944,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "5be1ac112eba3db9df33f178ce90bc93b78ae47a",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-27T22:00:44+01:00",
          "tree_id": "931c6487cd1e072a631acd1f65ba3888683fa105",
          "url": "https://github.com/gadget-inc/fsdiff/commit/5be1ac112eba3db9df33f178ce90bc93b78ae47a"
        },
        "date": 1640638945782,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 181622,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 306955540,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 438135292,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "8a8448219f73be7f1c556e7eea4c73232598d3a8",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-27T22:11:18+01:00",
          "tree_id": "2c1c5e2c51772ec29be6ad311070931acc5e8ef2",
          "url": "https://github.com/gadget-inc/fsdiff/commit/8a8448219f73be7f1c556e7eea4c73232598d3a8"
        },
        "date": 1640639573221,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 198142,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 291779019,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 441760028,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "8a8448219f73be7f1c556e7eea4c73232598d3a8",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-27T22:11:18+01:00",
          "tree_id": "2c1c5e2c51772ec29be6ad311070931acc5e8ef2",
          "url": "https://github.com/gadget-inc/fsdiff/commit/8a8448219f73be7f1c556e7eea4c73232598d3a8"
        },
        "date": 1640639733150,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 252943,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 289584756,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 430447835,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "96ebb23ed2a40cbda51159d0352377efdb982de7",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-29T21:39:52+01:00",
          "tree_id": "a253b0682d8418f398f6ae478af9170208783e6d",
          "url": "https://github.com/gadget-inc/fsdiff/commit/96ebb23ed2a40cbda51159d0352377efdb982de7"
        },
        "date": 1640810615723,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 247538,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 368339342,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 523110678,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "69f44c8cc697b78719dc498f3e2f9d4718b48c14",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-30T14:57:56+01:00",
          "tree_id": "c68714c38b0c360dfffceec6f1336a92acf64dff",
          "url": "https://github.com/gadget-inc/fsdiff/commit/69f44c8cc697b78719dc498f3e2f9d4718b48c14"
        },
        "date": 1640872799817,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 208928,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 397230696,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 581415524,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "4292dd8e1efb584f79f7a7d4066db309d4ea868f",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-30T15:39:03+01:00",
          "tree_id": "46936664503a724352c17d68815da0a388697348",
          "url": "https://github.com/gadget-inc/fsdiff/commit/4292dd8e1efb584f79f7a7d4066db309d4ea868f"
        },
        "date": 1640875255210,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 282251,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 347761279,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 526554935,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "4292dd8e1efb584f79f7a7d4066db309d4ea868f",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-30T15:39:03+01:00",
          "tree_id": "46936664503a724352c17d68815da0a388697348",
          "url": "https://github.com/gadget-inc/fsdiff/commit/4292dd8e1efb584f79f7a7d4066db309d4ea868f"
        },
        "date": 1640875749015,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 218251,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 349195537,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 497594960,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "55b107295cd9c62934961176a95432be5b82722e",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-30T15:59:46+01:00",
          "tree_id": "2a65bb1ae3d98683f052cfe3a53afba6c50a98e0",
          "url": "https://github.com/gadget-inc/fsdiff/commit/55b107295cd9c62934961176a95432be5b82722e"
        },
        "date": 1640876509435,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 309290,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 381657042,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 547876662,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "committer": {
            "email": "alex.louis.angelini@gmail.com",
            "name": "Alex Angelini",
            "username": "angelini"
          },
          "distinct": true,
          "id": "55b107295cd9c62934961176a95432be5b82722e",
          "message": "Hash only the latest files",
          "timestamp": "2021-12-30T15:59:46+01:00",
          "tree_id": "2a65bb1ae3d98683f052cfe3a53afba6c50a98e0",
          "url": "https://github.com/gadget-inc/fsdiff/commit/55b107295cd9c62934961176a95432be5b82722e"
        },
        "date": 1640876520594,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkSimpleInitialDiff",
            "value": 286862,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactInitialDiff",
            "value": 400664159,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          },
          {
            "name": "BenchmarkReactChangedDiff",
            "value": 539995980,
            "unit": "ns/op",
            "extra": "10 times\n2 procs"
          }
        ]
      }
    ]
  }
}