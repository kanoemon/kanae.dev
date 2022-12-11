---
layout: ../../layouts/PostLayout.astro
title: The Modern JavaScript Tutorial 2
tags: ["javascript"]
date: 2022-06-21T00:00:00.001Z
---

<a href="https://kanoe.dev/blog/modern-javascript-tutorial-1">The Modern JavaScript Tutorial 1</a>の続きから。

- <a href="https://javascript.info/date" target="_blank">日時</a>
  - new Date()に関する説明
  - ベンチマークの話も
    - ベンチマークを取るときにはベンチマークの全体を複数回実行する必要がある
- <a href="https://javascript.info/json" target="_blank">JSONメソッド、toJSON</a>
  - JSONのお話
  - toJSONというメソッドをオブジェクトに追加することで、JSON.stringifyのデフォルトの挙動を変えることができる
- <a href="https://javascript.info/recursion" target="_blank">再帰とスタック</a>
  - 再帰的に関数が呼び出されるとき、実行プロセスに関する情報は実行コンテキストスタックに格納される
  - スタックはメモリを消費する。再帰の深さはスタックの深さと同じになるため、再帰が深くなればなるほどメモリを使うことになる
  - 再帰はループで書き換えられる。ループは単一のコンテキストを使うためメモリの消費は少なく済む
  - 再帰によりコードが短くわかりやすくなるメリットがある
  - ケースバイケースで再帰とループを使い分けること
- <a href="https://javascript.info/rest-parameters-spread" target="_blank">残りのパラメーターとスプレッド構文</a>
  - 任意の数の引数を配列にまとめて渡すことができる
    - 呼び出す側は hoge(1, 2, 3, 4)と書く
    - 呼び出される側は function hoge(a, b, ...c)と書く
    - a=1, b=2, c=[3, 4]の値が入る
  - 逆に配列を展開することもできる
    - 例えばarr=[1, 2, 3, 4]という配列の変数があるとする
    - function hoge(a, b, c, d)という関数を呼び出すときにhoge(...arr)と書くと配列を展開して渡すことができる
  - ちなみにphp7.4からスプレッド構文が使えるようになったそう
