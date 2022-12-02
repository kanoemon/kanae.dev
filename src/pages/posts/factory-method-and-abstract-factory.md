---
title: Factory MethodパターンとAbstract Factoryパターン
tags: ["デザインパターン"]
date: "2020/11/15 00:00:00"
---

Factory MethodパターンとAbstract Factoryパターンの違いをみていきます。

## Factory Methodパターン

まずFactory Methodパターンですが、これはTemplate Methodパターンにインスタンス生成が含まれるパターンです。  
GoFのデザインパターンでは、単純にFactory Methodを使ったものではなく、サブクラスにインスタンス生成を任せるパターンをFactory Methodパターンと呼んでいるようです。

Factory Methoeパターンのコードは以下になります。

```php
abstract class Factory
{
    abstract protected function craeteProduct(string $owner);
    abstract protected function registerProduct($product);

    public function create(string $owner)
    {
        $product = $this->createProduct($owner);
        $this->registerProduct($product);
        return $product;
    }
}

class IDCardFactory extends Factory
{
    protected function createProduct(string $owner)
    {
        return new IDCard($owner);
    }

    protected function registerProduct($product)
    {
        // .....
    }
}
```

createProductのFactory Methodを抽象メソッドとし、サブクラスで実際にどのクラスのインスタンス生成を行うかを委ねています。

## Abstract Factoryパターン

Abstract Factoryパターンはインスタンス生成を別クラス(Factoryクラス)に切り出し、そのFactoryクラスにインタフェース or 抽象メソッドを定義したものになります。

コードは以下になります。

```php
abstract class Factory
{
    abstract protected function createProduct(string $owner);
}

class IDCardFactory extends Factory
{
    protected function createProduct(string $owner)
    {
        return new IDCard($owner);
    }
}

class ProductService
{
    public function create(string $owner, Factory $factory)
    {
        $product = $factory->createProduct($owner);
        $this->registerProduct($product);
        return $product;
    }

    protected function registerProduct($product)
    {
        // .....
    }
}
```

## 2つのデザインパターンの違い

2つのデザインパターンの共通点はFactory Method(createProduct)の抽象メソッドを持っていることですね。  
では違いはなんでしょうか？

まず、インスタンス生成側から見ていくとFactory MethodパターンはFactory Methodと密結合になっています。  
一方Abstract FactoryパターンはFactoryのインタフェースを呼び出しているだけなので、疎結合が保たれています。  
このことからAbstract Factoryパターンの方がインスタンス生成のロジックが再利用性が高いことがわかります。

また、Abstract Factoryパターンの目的はあくまでインスタンス生成のインタフェースを定義することですが、  
Factroy Methodパターンはそのインスタンス生成を利用するロジックまでを抽象化しています。
いわゆるTemplate Methodパターンに該当する部分ですね。  

以上のようにどちらもFactoryという言葉を使っていて、かつインスタンス生成に関するデザインパターンなのでわかりにくいですが、どちらも全然異なるデザインパターンなのです。
