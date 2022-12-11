---
layout: ../../layouts/PostLayout.astro
title: REST APIで適切なHTTPステータスコードを返す
tags: ["rest api"]
date: 2022-10-08T00:00:00.001Z
---

HTTPステータスコードは3桁の数字で表されており、最初の数字は分類を表しています。

- 1XX(Informational)- 情報
- 2XX(Successful)- 成功
- 3XX(Redirection)- リダイレクト
- 4XX(Client Error)- クライアントサイドに起因するエラー
- 5XX(Server Error)- サーバサイドに起因するエラー

以下にREST APIで扱うことが多いHTTPステータスコードをピックアップしてまとめます。

## 2XX(Successful) - 成功
リクエストが成功したことを示します。

|ステータスコード|名前|説明|
|----|----|----|
|200|OK|データの取得に成功、またはリクエストした処理が成功した。|
|201|Created|リクエストが成功し、サーバ側でデータが作成された。POSTメソッドで利用される。|
|202|Accepted|リクエストが成功したが、まだ処理が完了していない。処理に時間がかかる場合に利用される。|
|204|No Content|リクエストが成功し、レスポンスが空。DELETEメソッドやPUTメソッドで利用される。レスポンスを返す場合は204ではなく200を使う。|

## 3XX(Redirection) - リダイレクト
Webサイトの場合は該当のページが移動した場合に別のページを表示させたい場合に利用されるリダイレクトですが、APIで使用することは好ましくはありません。  
ブラウザであればHTTPステータスコードを見て適切にリダイレクトを行ってくれますが、APIの場合はクライアントが実装していなければ適切に処理されないためです。

以下には3XXのリダイレクト以外のステータスコードを記載します。

|ステータスコード|名前|説明|
|----|----|----|
|304|Not Modified|前回のデータ取得からデータが変わっていない。レスポンスは空になる。|

## 4XX(Client Error) - クライアントサイドに起因するエラー
クライアントのリクエストに問題があった場合に4XXのステータスコードが返されます。  
サーバ側に問題は起きていないですが、クライアントからのリクエストのパラメータやリクエストが許可されていない場合に利用されます。

|ステータスコード|名前|説明|
|----|----|----|
|400|Bad Request|リクエストが正しくない。|
|401|Unauthorized|認証のエラー。|
|403|Forbidden|認可のエラー。|
|404|Not Found|リクエストしたデータが存在しない。|
|405|Method Not Allowed|エンドポイントは存在するが、指定されたメソッドが許可されていない。|
|406|Not Acceptable|クライアントが指定したデータ形式(JSONやXML)に対応していない。|
|408|Request Timeout|リクエストを送ることに時間がかかりすぎてサーバ側でタイムアウトした。|
|409|Conflict|リソースが競合したエラー。ID指定でデータを登録するリクエストの場合に、既に指定したIDのリソースが存在する時に利用さる。|
|410|Gone|以前は存在していたが、今はもう存在しない。|
|413|Request Entity Too Large|リクエストボディ、リクエストヘッダーが大きすぎるエラー。|
|414|Request-URI Too Large|GETのクエリパラメータが長すぎる場合のエラー。|
|415|Unsupported Media Type|リクエストヘッダーのContent-Typeのデータ形式がサポートされていない。|
|429|Too Many Requests|アクセス回数が上限に達した。|

## 5XX(Server Error) - サーバサイドに起因するエラー
サーバ側に問題があった場合に5XXのステータスコードが返されます。

|ステータスコード|名前|説明|
|----|----|----|
|500|Internal Server Error|サーバ側になにか問題がある。|
|503|Service Unavailable|サーバが一時的に利用できない。メンテナンスでサービスを止める場合や、サーバが過負荷状態など一時的にレスポンスが返せない状態の時に利用される。|

## 参考
- <a href="https://datatracker.ietf.org/doc/html/rfc7231" target="_blank">RFC 7231</a>
- <a href="https://af.moshimo.com/af/c/click?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062&amp;url=https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F4873116864" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" target="_blank">Web API: The Good Parts</a><img src="//i.moshimo.com/af/i/impression?a_id=3489058&amp;p_id=170&amp;pc_id=185&amp;pl_id=4062" alt="" width="1" height="1" style="border: 0px;" />

