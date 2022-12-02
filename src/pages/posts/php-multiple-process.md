---
title: PHPで複数プロセスを制御する
tags: ["PHP", "Linux"]
date: "2020/10/23 00:00:00"
---

PHPで複数プロセスの制御のやり方。

```php
$maxProcessNum = 2;

for($i = 0; $i < 3; $i++) {
    // プロセスが指定の最大数動いていた場合は、プロセスが減るまで待つ
    while((int) `ps -ef | grep -c "[p]rocessOther.php"` >= $maxProcessNum) {
        sleep(1);
    }
    // 二重起動の制御
    if ((int) `ps -ef | grep -c "[p]rocessOther.php $i"` === 0) {
        `php processOther.php $i > /dev/null &`;
    }
}

error_log("process end\n", 3, 'debug.log');
```

psをgrepするときに`[]`を使うと自身のプロセスが除外されることを知りませんでした。便利だ。

上記のコードを実行した直後に`ps`コマンドを実行すると、以下が表示されます。

```
64176 ttys001    0:00.13 php process.php
64184 ttys001    0:00.11 php processOther.php 0
64192 ttys001    0:00.10 php processOther.php 1
```

複数プロセスが立ち上がっていることがわかります。
