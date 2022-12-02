---
title: 使い方注意なPluggable Selectorパターン
tags: ["PHP", "デザインパターン"]
date: "2020/10/03 00:00:00"
---

<a href="https://www.amazon.co.jp/dp/B077D2L69C/ref=dp-kindle-redirect?_encoding=UTF8&amp;btkr=1" target="_blank">テスト駆動開発</a>の本で学んだPluggable Selectorパターンのまとめです。

## Pluggable Selectorとは

本では、インスタンスごとに異なる振る舞いをさせたいときに、動的にメソッド名を呼び出させる、と書かれていました。「Pluggable(差し込み可能)」+「Selector(選択者)」の言葉から考えると、使う側が使うものを決められるということでしょうか。

実際にコードを書きながらどういうことなのかを見てみます。

### 実例

例えばGreetingという挨拶を取り扱うクラスがあったとして、各言語で異なる挨拶を返すメソッドが必要になったとします。

#### 1. Greetingを継承してサブクラスを追加するパターン

```php[GreetingJapanese.php]
<?php

namespace DesignPatterns\PluggableSelector;

class GreetingJapanese extends Greeting
{
   public function greet()
   {
       return 'こんにちは';
   }
}
```

```php[GreetingEnglish.php]
<?php

namespace DesignPatterns\PluggableSelector;

class GreetingEnglish extends Greeting
{
   public function greet()
   {
       return 'Hello';
   }
}
```

この時クラスを使いたい側は以下のようなコードで呼び出すことになります。

```php
<?php

$greetingJapanese = new GreetingJapanese();
echo $greetingJapanese->greet();

$greetingEnglish = new GreetingEnglish();
echo $greetingEnglish->greet();
```

#### 2. 引数によって使うメソッドを切り替えるパターン

今回のようなサブクラスを追加するパターンだと、1つのメソッドしか実装されていないクラスが新しく作られることになり、少し過剰な実装にも見えます。
そのため、既存のGreetingクラスに新しくメソッドを追加し、そのメソッドで使うメソッドを切り替えられるように変えてみます。

```php[Greeting.php]
<?php

namespace DesignPatterns\PluggableSelector;

class Greeting
{
   public function greet($lang)
   {
       if ($lang === 'japanese') {
           return $this->greetByJapanese();
       }
       
       if ($lang === 'english') {
           return $this->greetByEnglish();
       }
       return;
   }

   public function greetByJapanese()
   {
       return 'こんにちは';
   }

   public function greetByEnglish()
   {
       return 'Hello';
   }
}
```

クラスを使う側はこうなります。

```php
<?php

$greeting = new Greeting();
echo $greeting->greet('japanese');

echo $greeting->greet('english');
```

#### 3. 引数によって使うメソッド名を生成するパターン(Pluggable Selectorパターン)

今追加している機能は日本語と英語だけですが、これが中国語、ドイツ語、フランス語・・・と増えていくとgreetメソッドにどんどん分岐が増えていくことになります。
そのため、今度は引数で受け取った文字列からメソッド名を動的に生成し、分岐を追加しなくてもすむようにしてみます。

```php[Greeting.php]
<?php

namespace DesignPatterns\PluggableSelector;

class Greeting
{
   public function greet($lang)
   {
       $method = 'greetBy' . ucfirst($lang);
       if (!method_exists($this, $method)) {
           throw new \BadFunctionCallException('Method ' . $method . ' is not callable');
       }
       return $this->$method();
   }

   public function greetByJapanese()
   {
       return 'こんにちは';
   }

   public function greetByEnglish()
   {
       return 'Hello';
   }
}
```

使う側はこうなります。2でメソッドを切り替えていたパターンと変わってませんね。

```php
<?php

$greeting = new Greeting();
echo $greeting->greet('japanese');

echo $greeting->greet('english');​
```

これが「Pluggable Selectorパターン」です。

## まとめ

コードの量が減ったり、今後のメンテナンスがしやすそうに見えるPluggable Selectorパターンですが、タイトルにも書いた通り使い方には注意が必要です。

本にも書いてありましたが、Pluggable Selectorパターンは濫用される危険性があります。実際、仕事をしていてこのパターンをあちこちに使っているシステムを見たことがあります。

濫用された時に何が問題になるかというと、処理が追いにくくなるという点です。メソッドがどこで使われているのか探しづらくなるんですよね、IDEで追えなくなるし。

本にはサブクラスが1つだけメソッドを持つような単純な状況の時にとどめた方がいい、と書かれていましたが、今までの経験からもデメリットの方が大きいと感じるので自分は使わないかなあ。
