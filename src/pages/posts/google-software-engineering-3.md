---
title: 「Googleのソフトウェアエンジニアリング」を読んだ(後編)
tags: ["book", "engineering"]
date: "2022/10/29 00:00:00"
---

「<a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873119650" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank">Googleのソフトウェアエンジニアリング ―持続可能なプログラミングを支える技術、文化、プロセス</a>」の読書メモの中編です。第16章〜最後の25章まで。  
第1章〜10章までの読書メモは<a href="https://kanoe.dev/blog/google-software-engineering" target="_blank">こちら</a>。  
第11章〜15章までの読書メモは<a href="https://kanoe.dev/blog/google-software-engineering-2" target="_blank">こちら</a>。  
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

## 16章 バージョンコントロールとブランチ管理
バージョンコントロールはコードと時間の相互作用を管理するためのものである。そのコードがどの時点でどの状態だったのかを管理してくれる。
コードを長期の間、有用なコードに保つためにはバージョンコントロールは切り離せないことがわかると思う。バージョンコントロールがなければ、バグが入り混んでも元に戻すことは困難だろうし、今のコードにどのような変更が入り込んだのかを管理することは難しいだろう。変更の履歴を管理するということはソフトウェアを開発していくにあたって大事なことということがわかる。

バージョンコントロールの方法として、本書では単一バージョンルールをお勧めしている。どこにマージするか、どこに依存するかを一つにすることだ。モノリポの考え方だ。選択の余地をなくすることで単純化するという考え方が重要なポイントのようだ。

ちなみにモノリポについては以下のCircleCIの記事もわかりやすかった。  
https://circleci.com/ja/blog/monorepo-dev-practices/

## 17章 Code Search
コードの理解は運用と保守をするにあたって重要な鍵となる。そのためコードの理解を支援すると、エンジニアリングの生産性を大きく押し上げることができる。コードの理解への投資は利益を生み出すことができるのだ。

これは個人レベルでも自分の生産性を上げるために同じことが言えそう。VSCodeのプラグインで、そのコードが「いつ」「どこで」「誰が」「何故」「どのように」して実装したのかを手助けしてくれるものを入れると自分の生産性も上がりそう。

## 18章 ビルドシステムとビルド哲学
ビルドシステムを適切に制限すると開発者にとって楽になるという話が印象的だった。  
ビルドシステムは複雑なものになりがちで、扱いが難しくなっていく。どのようにビルドをするかはシステムに任せて、何をビルドするかは開発者が命令する。宣言型のマニフェストを使っていく。  
適切に権限を制限することで、逆にエンジニアの生産性を高めることができるという話が参考になった。

## 19章 Googleのコードレビューツール Critique
コードレビューの主要なゴールは、リーダビリティの向上と保守の向上である。
コードレビューのツールはコードレビューの核である信頼とコミュニケーションに置き換えることはできないが、エンジニア体験の向上をすることはできる。  
ツールに任せられることは任せて、人間の手が必要なものに時間を多くさけるようにしていくという話はコードレビュー以外でも言える話だ。

## 20章 静的解析
静的解析は早期にバグを発見できる。また、ベストプラクティスをコード化したりコードを最新のバージョンへ更新するよう促したり、技術的負債を防いだり減らしたりすることもできる。さらに開発者を教育したり、コードにアンチパターンが入り込むことを防げる。  
あまり普段意識できていなかったが、こう書かれると確かにその通りだと思うし、静的解析のメリットって改めて大きいんだな〜。

静的解析は誤検出の話も参考になった。静的解析で指摘されてもエンジニアが修正しない場合は、それは誤検出扱いになるという話。身に覚えがある…。緊急度が高くなかったり、逆にそれを修正することで複雑になるからって指摘を修正しないケースってあるんだよね。そういう場合は開発者が静的解析のパターンを変更できるようにして静的解析の精度を高めていくと良いと紹介されている。

## 21章 依存関係管理
依存関係を管理する方法としてはセマンティックバージョニングが使われていることが多いだろう。わたしの仕事のプロダクトでも全てそうだ。ただセマンティックバージョンにもリスクはあって、それは人間がその変更をどれだけリスクがあると考えるかによって変わるため、破壊的ではないと言われていた変更が実は破壊的な変更である可能性があるのだ。うーん、確かに…。本書でも書かれているが、依存関係の管理は難しい…。

セマンティックバージョンに頼るだけではなく、テストとCIを使うことで新バージョンのコードが連携して動作するかのエビデンスを取ることが重要になってくる。

## 22章 大規模変更
システムを運用、保守していると全体で広範囲のコード変更を行う必要性が出てくる。例えば何かのバージョンアップであったり、古いシステムから新しシステムへの切り替えがそうだ。わたしも経験がある。
そういう大規模なコードの変更をどのようにして行うかはきちんと検討しておくとよいと。確かにあらかじめ検討して方法を考えておくだけでもだいぶ違うな〜。その方法を考えることで気づけなかった運用保守のために必要なタスクにも気づけるだろうし。

そういった変更する能力がシステムにあると、コードを長期的に柔軟性のある状態に保つことができるし、技術決定の再考をすることも可能になる。技術の再考をすることが可能なことがわかっていれば、技術の選定のスピードもあげたり、より良い改善や選択をしていけそう。

## 23章 継続的インテグレーション
CIのゴールは問題のあるコードの変更をできるだけ早く自動的に発見することである。早く発見できればそれを修正するコストも下げることができるからだ。  
あとは問題はCIが自動で発見してくれることで、エンジニアは開発に集中できるというメリットもある。これは監視とかの他のタスクにも言えることだなと思いながら読んでいた。

## 24章 継続的デリバリー
コードの価値はユーザーが機能を利用できる段階で実現される。ここ重要！  
システムの最大のリスクはユーザにとって有用ではない機能を開発していること。ここも重要！

開発が終わったこととユーザのフィードバッグとの間の時間を減少させることで、進捗中の作業コストを最小化できる。そのためには、常に頻繁にリリースできる状態が自動化されていることが大事なのである。ここではリリースまでの話だけど、リリース後の効果測定などの話も同じだなって思った。

頻繁にリリースできるという点で、小さな変更を早くリリースしていくべきとも書かれている。小さな問題ならトラブルシューティングも限定的になるからだ。

## 25章 サービスとしてのコンピュート
コードを動かすためには何かしらのハードウェアが必要だ。この章ではスケールしていくためのシステムを動かすインフラの話が紹介されている。  
組織がスケールしていくと管理するアプリケーションが増え、アプリケーションのサイズが増え、アプリケーションの実行が必要なコピー数が増えていく。スケールしていくためにはこれらに対処できるように自動化が必須となる。 それを実現する共通のインフラストラクチャーがあると組織のスケールにも対処しやすくなっていく。  
スケールに対応してくためには、どのシステムでも必要になってくる作業をうまく共通化することが重要になっていくことを改めて感じた。

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
