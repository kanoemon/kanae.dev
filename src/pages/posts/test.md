---
layout: ../../layouts/PostLayout.astro
title: test
slug: test
pubDate: 2023-02-03T09:40:50.807Z
tags: []
---
httprouterでpprofを使えるようにする
結論以下の修正でいけそう





    "log"
    "net"
    "net/http"
+   _ "net/http/pprof"
    "os"
    "os/signal"
    "syscall"




    handleURLPanic(router)
    handleURLMethodNotAllowed(router)
 
+   // profiling
+   router.Handler(http.MethodGet, "/debug/pprof/*item", http.DefaultServeMux)
 
    // Health Check Enpoint
    router.GET("/health", handler.HealthHandler.HealthCheck)
なぜ以下のやり方ではダメだったのか？

https://pkg.go.dev/net/http/pprof



ダンマネは以下ライブラリを使ってルーティングしている。

https://github.com/julienschmidt/httprouter



pprofはimportした段階で使えるようになるらしい

https://zenn.dev/muroon/articles/adf577f563c806#serverside%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%ABpprof%E3%82%92%E4%BB%95%E8%BE%BC%E3%82%80%E3%81%A8%E3%81%8D%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9

ListenAndServerしないといけないのは、httpサーバを実行していない場合


If you are not using DefaultServeMux, you will have to register handlers with the mux you are using.
DefaultServeMuxとは？
DefaultServeMuxは、net/httpパッケージ内に存在する公開グローバル変数です。
net/httpを使ったデフォルトのルーティング設定をしていないであれば、独自でハンドラを登録しないといけないよといっている。
使っていれば、パッケージ初期化のタイミングでpprofのルーティングが設定される。



https://cs.opensource.google/go/go/+/refs/tags/go1.19.5:src/net/http/pprof/pprof.go

init関数は特殊な関数で、パッケージの初期化に使われます。

つまりimportした段階で設定される。



参考になったPR

https://github.com/julienschmidt/httprouter/issues/236