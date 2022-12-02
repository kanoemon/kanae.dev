---
title: "PDOのERRMODE_EXCEPTION無しのエラーハンドリング"
tags: ["PHP"]
date: "2020/08/11 00:00:00"
---

たまにPDOをERRMODE_EXCEPTIONを指定せずに使っていて、1つ処理をするたびにif文でエラーハンドリングをしているプログラムを見かけます。
なんのためのチェックか分からないまま既存の処理に合わせて開発してることが多かったので、各エラー処理で何をチェックしているのかを整理しました。

## PDOの実装

```php
<?php

try {
    // 1. PDO のインスタンス生成
    $db = new PDO('mysql:dbname=test;host=localhost", "dbuser", "dbpassword');
} catch(PDOException $e) {
    error_log($e->getMessage());
    return;
}

$sql = 'select user_id, name from users where user_id = ?';

// 2. prepareメソッドの呼び出し
if (($stmt = $db->prepare($sql)) === false) {
  error_log(print_r($db->errorInfo(), true));
  return;
}

// 3. executeメソッドの呼び出し
if ($stmt->execute(array(1)) === false) {
  error_log(print_r($stmt->errorInfo(), true));
  return;
}

// 4. fetchメソッドの呼び出し
if (($row = $stmt->fetch()) === false) {
  error_log(print_r($stmt->errorInfo(), true));
  return;
}
```

### 1. PDOのインスタンス生成

ここでは、指定されたDBへ接続するためのPDOインスタンスを生成しています。
PDOのインスタンス生成時にDBへの接続に失敗すると、PDOExceptionを投げます。

### 2. prepareメソッドの呼び出し

executeメソッドで実行するためのSQL文を準備し、プリペアドステートメントを生成します。プリペアドステートメントとは、実行したいSQLのテンプレートのようなものです。
生成したテンプレートのSQLに構文エラーがあるとfalseが返されます。

### 3. executeメソッドの呼び出し

プリペアドステートメントを実行します。実行が成功すればtrue、失敗すればfalseを返します。
ちなみに前の処理のprepareメソッドのエラー処理をチェックしていなかった場合、何かしらの構文エラーでprepareメソッドでfalseが返されて、そのあとexecuteメソッドが実行されるとfatalエラーで落ちます。PHPのfalse はオブジェクトではないからですね。

### 4. fetchメソッドの呼び出し

ここで実行が失敗する原因として考えられるのは、何かしらの原因でDBへの接続に失敗する場合です。

## 参考
<a href="https://www.php.net/manual/ja/class.pdo.php" target="_blank">PHP: PDO - Manual</a>
