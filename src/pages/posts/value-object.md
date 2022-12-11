---
layout: ../../layouts/PostLayout.astro
title: Value Objectを不変にする理由
tags: ["design patterns", "ddd"]
date: 2022-11-08T00:00:00.001Z
---

Value Objectの一番の特徴は不変であることです。

では、なぜValue Objectは不変である必要があるのでしょうか。

## ドメインモデルをオブジェクトにする理由

DDDでいうドメインモデルをValue Objectとしてオブジェクトにすることは様々な理由から有効であると言われています。

オブジェクトにすることで、そのドメインの振る舞いもオブジェクトにまとめられ、凝集度の高いオブジェクトができあがります。  
例えば電話番号をValue Objectにした場合は以下のコードになります。

```php
// 電話番号をXX-XXXX-XXXXの表記にしたい

// Value Objectを使わない場合
$telephoneNumber = $areaCode . '-' . $cityCode . '-' . $subscriberNumber;

// Value Objectを使う場合
$telephoneNumber = (new Telephone($areaCode, $cityCode, $subscriberNumber))->telephoneNumber();

class Telephone
{
    private $areaCode;
    private $cityCode;
    private $subscriberNumber;

    public function __construct(int $areaCode, int $cityCode, int $subscriberNumber)
    {
        $this->areaCode = $areaCode;
        $this->cityCode = $cityCode;
        $this->subscriberNumber = $subscriberNumber;
    }

    public function telephoneNumber(): string
    {
        return $this->areaCode . '-' . $this->cityCode . '-' . $this->subscriberNumber;
    }
}
```

オブジェクトにすることで電話番号の要素の型チェックもできるようになりました。

## オブジェクトの別名参照問題

こんな感じでオブジェクトにすることのメリットは色々あるのですが、問題も存在します。  
その一つが、別名参照問題[^1]です。  
(英語だとAliasingBugとも言うみたいですね)

あるオブジェクトを別の変数と共有した時に、その別の変数からオブジェクトの属性を変えられてしまい、もとのオブジェクトの属性も変わってしまうという問題です。

```php
class Hoge
{
    private $a;

    public function setA($a)
    {
        $this->a = $a;
    }

    public function getA()
    {
        return $this->a;
    }
}

$hoge1 = new Hoge();
$hoge1->setA('a');
var_dump($hoge1->getA()); // string(1) "a"

$hoge2 = $hoge1;
$hoge2->setA('b');

var_dump($hoge2->getA()); // string(1) "b"
var_dump($hoge1->getA()); // string(1) "b"
```

変数の代入を例にあげましたが、他にもメソッドの引数や戻り値でオブジェクトを渡す場合にも同じ問題がおきます。

この問題を回避するためにオブジェクトは不変にすべきというのが、Value Objectを不変にしなければいけないと言う理由に繋がっていくのです。

でもそれってValue Objectだけの話じゃなくない？と言うのはその通りで。  
不変性はプログラミングをする上で、常に意識しておかなけばいけないものなのです。

ちなみにこの別名参照問題が起きる可能性があるのがEntityです。  
このような理由からも、なんでもかんでもEntityに突っ込むのではなく、EntityとValue Objectは区別して考えた方がいいと言われているのですね。

## 不変なオブジェクトから得られるメリット

Value Objectを不変にするメリットとしてあげられるのが、パフォーマンスチューニングのしやすさです。  
不変なオブジェクトであれば、例えばFlyweightパターンやSingletonパターンでオブジェクトを共有できますが、中身が変わってしまう可能性があると別の方法を考えなければいけません。

オブジェクトを不変にするというルールのおかげでパフォーマンスチューニングの選択肢が広がり、開発者はパフォーマンスチューニングの手段を自由に選ぶことができるようになるのです。

[^1]: https://martinfowler.com/bliki/AliasingBug.html
[^2]: エリック・エヴァンスのドメイン駆動設計
