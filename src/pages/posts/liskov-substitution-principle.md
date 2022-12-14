---
layout: ../../layouts/PostLayout.astro
title: リスコフの置換原則(Liskov substitution principle)
tags: ["solid", "clean-code"]
pubDate: 2020-10-29T00:00:00.001Z
---

リスコフの置換原則(Liskov substitution principle)は1988年にBarbara Liskovが示した「継承」に関する原則です。

> ここで望まれるのは、次に述べるような置換可能な性質である：  
> S型のオブジェクトo1の各々に、対応するT型のオブジェクトo2が1つ存在し、Tを使って定義されたプログラムPに対してo2の代わりにo1を使ってもPの振る舞いが変わらない場合、SはTの派生型であると言える[^1]

なんだか難しいですが、つまりあるクラス(スーパークラス)を継承したクラス(サブクラス)があった場合、スーパークラスとサブクラスは置換可能であれ、という原則です。

## 継承とは

ではそもそも継承ってなんでしょう？

「Code Complete」では、継承とはあるクラスが別のクラスの特化であるという概念だと説明されています。[^2]

複数のクラスにあるメソッドやプロパティをスーパークラスに定義して、コードの重複を無くし、コードを単純化することができます。  
このとき、スーパークラスとサブクラスにはis-aの関係、"B is a A."（BはAの一種である）という関係が成り立っていなければいけません。  
例えば、Dog is an Animal.の関係は成り立つので、DogクラスはAnimalクラスを継承できるといえます。

## LSPと継承

ではLSPにしたがって継承を考えてみます。

先に説明した通り、LSPはスーパークラスとサブクラスが置換できるようにすべきという原則です。  
これは、スーパークラスとサブクラスでインタフェースや振る舞いが同じであるべきだと言い換えることもできます。

Dog is an Animal.の例で再度掘り下げてみます。  
Animalクラスを継承するDogクラスとCatクラスを呼び出すような以下のコードがあったとします。

```php
public function getName(Animal $animal)
{
    if (get_class($animal) === 'Dog') {
        return $animal->getName();
    }
    if (get_class($animal) === 'Cat') {
        // CatクラスのgetName()は英語で名前が返される。
        // 日本語の名前が欲しかったので、getNameByJapaneseを使った。
        return $animal->getNameByJapanese();
    }
}
```

これはLSPを違反しているコードです(OCPも違反してます)。  
AnimalクラスとCatクラスで振る舞いが異なっている(置換可能になっていない)ために分岐が生まれ、OCPの違反も起きてしまいました。  
この場合、AnimalクラスとCatクラスにはis-a関係は成り立っていますが、振る舞いが異なっているため継承すべきではないということになります。

もしLSPを守っていれば以下のようにシンプルなコードに修正することができます。

```php
public function getName(Animal $animal)
{
    return $animal->getName();
}
```

OCPも守ることができましたね。

[^1]: Clean Architecture　達人に学ぶソフトウェアの構造と設計
[^2]: CODE COMPLETE 第2版
