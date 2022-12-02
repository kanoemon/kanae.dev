---
title: オブジェクトを作るメソッド Factory Methodパターン
tags: ["デザインパターン"]
date: "2020/10/16 00:00:00"
---

<a href="https://www.amazon.co.jp/dp/B077D2L69C/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1" target="_blank">テスト駆動開発</a>のデザインパターンの章を読んでいたら、Factory Methodパターンの内容が今まで認識してたものとちょっと違ってました。

テスト駆動開発の本だと、Factory Methodを使うパターンをFactory Methodパターンと呼んでいるみたいです。  
ちなみにFactory Methodとはオブジェクトを作成するメソッドを指します。

つまり以下のように書けるコードはFactory Methodパターンであると書かれています。

```ruby
oracle_db = DbConnection.oracle # DBConnectionクラスのoracleメソッドでOracle.newをreturnしてる
mysql_db = DbConnection.mysql  # DBConnectionクラスのmysqlメソッドでMysql.newをreturnしてる
```

GoFのデザインパターンで学んだFactory Methodパターンよりも随分シンプルな説明で驚きました。  
GoFだと親クラスはオブジェクトの作り方は定義するが、実際に作るのは子クラスに任せると言われていますよね。

そもそもFactory Methodパターンはオブジェクトを柔軟に作り出すために使うデザインパターンです。  
そういう意味だとクラスを使う側にオブジェクトを生成させる(newさせる)のではなく、  
オブジェクトを作成するメソッドを用意して提供するものであればFactory Methodパターンと呼んでもいいんだろうな。
