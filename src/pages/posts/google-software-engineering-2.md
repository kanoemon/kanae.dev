---
layout: ../../layouts/PostLayout.astro
title: 「Googleのソフトウェアエンジニアリング」を読んだ(中編)
tags: ["book", "testing", "engineering"]
date: 2022-10-22T00:00:00.001Z
---

「<a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873119650" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank">Googleのソフトウェアエンジニアリング ―持続可能なプログラミングを支える技術、文化、プロセス</a>」の読書メモの中編です。第11章〜15章まで。  
第1章〜10章までの読書メモは<a href="https://kanoe.dev/blog/google-software-engineering" target="_blank">こちら</a>。
<img src="//i.moshimo.com/af/i/impression?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062" alt="" width="1" height="1" style="border: 0px;" />   

<div class="amazon-box">
<div>
<a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873119650" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank"><img src="https://images-fe.ssl-images-amazon.com/images/I/4113eD01v2L._SL160_.jpg" alt="" style="border: none;" /></a>
</div>
<div>
<a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873119650" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank">Googleのソフトウェアエンジニアリング ―持続可能なプログラミングを支える技術、文化、プロセス</a><br>
竹辺 靖昭 (監修), Titus Winters (編集), Tom Manshreck (編集), Hyrum Wright (編集), 久富木 隆一  (翻訳)<br>
オライリージャパン
</div>
</div>
<img src="//i.moshimo.com/af/i/impression?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062" alt="" width="1" height="1" style="border: 0px;" />

## 11章 テスト概観
ここでも「左への移動」の話が出てきている。バグは早く見つけるほど修正のコストを低く抑えることができる。  
テストとはバグを見つけることができるものでもあるが、変化を可能にする能力を備えておくためにも重要なものである。テストを自動化させておくことで、新機能の開発やリファクタリングなど日々の開発の中でバグを正確に早く見つけることができるのだ。

自動テストでコードカバレッジが指標として使われることがある。ただコードカバレッジはテストされていないコードを教えてくれるが、どれだけ適切にテストされているかは示してくれない。テストコードの品質は、それがテストされる挙動をきちんと考える必要がある。コードカバレッジがたとえ100%だとしても、そのテストコードが間違った期待値で確認しているのだとしたら意味がなくなってしまうもんね。

ただ自動テストは万能ではないという話も書かれている。決まりきった挙動を確認するテストに自動テストは効果的だが、定性的な判断が必要なものや、未知なるバグを見つけるようなものには人の手が必要である。探索的テストとかが当てはまるかな。自動テストを適切に使い、本当に人の手が必要な部分に最大に価値が投入できるようにしていくといい。

## 12章 ユニットテスト
すぐに仕事で使いたくなるような情報がたくさんあった。保守性のあるユニットテストがキーワード。  保守性のあるテストにするためには、脆いテストにしないことと、明確にテストを書くことが紹介されている。

脆いテストとは変更に弱いテストである。わたしにも何度も苦い経験が…。例えばあるコードを修正したら、全然関係ないテストコードが失敗するようなケースかな。  
明確なテストとはそのテストが失敗した理由がわかりやすいこと、そのテストが何をしているかがわかりやすいことである。テストコードが失敗した場合のメッセージをわかりやすくしてあげたり、無理に一つのテストメソッドでいろんなケースをテストせずに分割したり、そのテストの意図が第3者に伝わるようなテストコードを書くように意識したほうがよいというお話。

章の後半ではDAMPという考え方が出てくる。Descriptive And Meaningful Phrasesの略で、日本語だと「説明的で意味がわかりやすい言い回し」になるらしい。テストコードはDRYではなくDAMPでを目指すべきであると。DRYを目指しすぎて複雑になったテストコードはバグが入り込みやすくなるからだ。明確なテストを書くための考え方だと思う。

## 13章 テストダブル
ユニットテストを書く上で欠かせないテストダブル、モックと呼ばれるものだ。この章ではテストダブルの効果的な使い方、そしてリスクが書かれている。  

テストダブルを誤って使うと、テストが脆くなり、不明確なものになってしまう。保守性の低いテストコードとなっていってしまうのだな。  
脆さでいうと、テストダブルを使うとテストする対象の実装の詳細を知る必要が出てくるため、変更に弱いテストになっていくかもしれない。   
不明確でいうとテストダブルを書くためのコードを書く必要があるので、テストコードが複雑になっていき何をするテストなのかがわかりにくくなるかもしれない。  
後はそもそもテストダブルとその対象のコードの実装の乖離が進み、意味をなさないテストになってしまうかもしれない。

以上のリスクが起きる可能性があるので、テストダブルは使いすぎないほうが良いと書かれている。じゃあどうしたらいいのかというと、フェイクというテクニックを使うと良いとのこと。ユニットテストで実行できない実装の部分だけ、別の実装に置き換える手法だ。例えばDB接続の部分をインメモリの実装に置き換える方法が考えられる。テストダブルは使わず、実際の実装をなるべく使うテストコードを書いていった方が保守性が高いテストコードになっていく。

## 14章 大規模テスト
ここでいう大規模テストとは、システム全体が意図通りに動くことを確認するようなテストである。例えば、パフォーマンステストや探索的テスト、A/Bテスト、ユーザ受け入れテスト、カオスエンジニアリングのようなものである。テストの種類によって用意すべき環境やデータ、検証方法は変わってくるが、基本的には実際にシステムが動く本番環境と同等の環境を用意する必要がある。  
大規模テストでユニットテストでは捉えられないバグを見つけることができる。ただ大規模テストの準備や実行にはコストがかかってしまう。プロジェクトによって、システムのリスクとそのリスクに対応するテストを見極める必要がある。

## 15章 廃止
見逃されがちだけどめちゃめちゃ重要なことなんだよな〜・・・。システムを無くすお話。  
システムは生きている限り継続的な保守のコストが発生する。そのシステムを廃止するか、保守のコストをかけ続けるかはコストを比較して判断していくべきである。  
作るより無くすほうが難しいことは自分の経験上も感じている。その理由について本書ではHyrumの法則で説明されている。後は廃止することに対して会社から理解が得られなかったり、時間がもらえない場合は、<a href="https://kanoe.dev/blog/google-software-engineering" target="_blank">7章のエンジニアリングの生産性の計測</a>によって具体的なエビデンスを出して示す方法が紹介されている。

<div class="amazon-box">
<div>
<a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873119650" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank"><img src="https://images-fe.ssl-images-amazon.com/images/I/4113eD01v2L._SL160_.jpg" alt="" style="border: none;" /></a>
</div>
<div>
<a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873119650" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank">Googleのソフトウェアエンジニアリング ―持続可能なプログラミングを支える技術、文化、プロセス</a><br>
竹辺 靖昭 (監修), Titus Winters (編集), Tom Manshreck (編集), Hyrum Wright (編集), 久富木 隆一  (翻訳)<br>
オライリージャパン
</div>
</div>
<img src="//i.moshimo.com/af/i/impression?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062" alt="" width="1" height="1" style="border: 0px;" />

「<a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873119650" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank">Googleのソフトウェアエンジニアリング ―持続可能なプログラミングを支える技術、文化、プロセス</a>」の他の章の読書メモは以下から。
- <a href="https://kanoe.dev/blog/google-software-engineering" target="_blank">「Googleのソフトウェアエンジニアリング」を読んだ(前編)</a>
- <a href="https://kanoe.dev/blog/google-software-engineering-2" target="_blank">「Googleのソフトウェアエンジニアリング」を読んだ(中編)</a>
- <a href="https://kanoe.dev/blog/google-software-engineering-3" target="_blank">「Googleのソフトウェアエンジニアリング」を読んだ(後編)</a>
