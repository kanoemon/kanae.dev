---
title: The Modern JavaScript Tutorial 1
tags: ["JavaScript"]
date: "2022/06/12 00:00:00"
---

最近フロントエンドを改めてしっかりと勉強し直したいと思い、フロントエンドの<a href="https://roadmap.sh/frontend" target="_blank">ロードマップ</a>に沿って勉強をし直しています。

今はJavaScriptのSyntax and Basic Constructsの項目にあるThe Modern JavaScript Tutorialを読んでいるところです。

- <a href="https://javascript.info/weakmap-weakset" target="_blank">WeakMapとWeakSet</a>
  - JavaScriptはオブジェクトがどのオブジェクトからも参照されていないと判断した場合にメモリから削除を行う
  - Mapでキーにオブジェクトを使用すると、そのオブジェクトをnullで上書きして消そうとしても、Mapで使われている限りメモリに残り続ける
  - WeakMapはキーのオブジェクトをnullで上書きすると、メモリから自動的に削除してくれる
    - ただし、どのタイミングで削除するかはJavaScriptのエンジンが決める
  - WeakMapはMapと異なりentries()、keys()、values()のメソッドをサポートしていない
    - メモリに存在しているオブジェクトか本当に存在しているかがわからないため
  - WeakMapのユースケースとしてはデータストレージや、キャッシュがある
- <a href="https://javascript.info/keys-values-entries" target="_blank">Object.keys、values、entries</a>
  - オブジェクトからキーや値、配列として取り出せたり変換できる
- <a href="https://javascript.info/destructuring-assignment" target="_blank">破壊的な割り当て</a>
  - 日本語だと分割代入でいいのかな？
  - 配列でもオブジェクトでも分割代入が可能
  - 展開元に値が存在しないときのためにデフォルト値が使用できる
  - 明示的に変数名を指定して代入する以外に、残りのパターンを`...変数名`を使用して代入することもできる
  - オブジェクトを展開するときはデフォルトだとキー名が変数名となり代入されるが、別の変数名を指定して代入することも可能
