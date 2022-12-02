---
title: 「SQLスタイルガイド」を見つけたので読んでみた
tags: ["SQL"]
date: "2020/09/12 00:00:00"
---

「<a href="https://www.amazon.co.jp/SQL%E3%82%A2%E3%83%B3%E3%83%81%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3-Bill-Karwin/dp/4873115892" target="_blank">SQLアンチパターン</a>」で紹介されていた「<a href="https://www.amazon.co.jp/dp/B006L21AO6/ref=dp-kindle-redirect?_encoding=UTF8&amp;btkr=1" target="_blank">Joe Celko's SQL Programming Style</a>」を調べていたら、そのSQL Programming Styleと互換性のあるというSQLスタイルガイドを見つけたので読んでみました。

<a href="https://www.sqlstyle.guide/ja" target="_blank">SQLスタイルガイド</a>

すごく簡潔にまとめられているので、サクッと読めます。

SELECTやWHEREなどのキーワードを右揃えにする整形方法は使ったことがなかったのですが、確かに見やすく感じました。
他にも個人的にSQLを書くときに整形方法について悩んでいたINNER JOINなどの結合の時や、副問い合わせの場合の整形方法についてもまとめられていたので、今後の参考にしようと思います。

```sql
SELECT * 
  FROM people
 WHERE create_date >= '2020-01-01' 
   AND status = 1
 ORDER BY id;
 ```

あとカラム名などの名前で使うと意味が分かりやすくなるキーワードのまとめも今後に使えそう。例えば「xxxx_status」は flag値または任意のタイプの状況を表すものだよ、とか。
テーブルのカラムの名前を決めるときや、ASでエイリアスをつけるときなど、名前について悩みがちなのでこれは助かる。

このスタイルガイドは絶対的なものではないですが、整った形で書かれたSQLは他の人からも読みやすくなったり、自分のSQLの書き方で悩む時間が減ったりとメリットも多いので、自分のスタイルガイドを持っておくといいのかもなー。
