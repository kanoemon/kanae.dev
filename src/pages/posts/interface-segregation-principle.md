---
title: インタフェース分離の原則(Interface Segregation principle)
tags: ["プログラミング", "設計"]
date: "2020/11/02 00:00:00"
---

インターフェース分離の原則(Interface Segregation Principle)。  
Robert C. Martinによって作られた原則です。

> A client should not be forced to implement an interface that it doesn’t use.[^1]

クライアントは使わないインタフェースの実装を強制されるべきではない、という原則です。

インタフェースを使ってインタフェースと実装を分離することで、クライアントは実装の詳細を知る必要がなくなり、クラス間を疎結合にすることができます。  
ISPを守ることで、インタフェースを小さく具体的な単位へ分割することができるようになり、クライアントは自分に必要なインタフェースのみを知ることができるようになります。

以下ISPに違反し、クライアントに不要なインタフェースの実装を強制している例です。

```php
interface AnimalInterface
{
    public function fly();
    public function run();
    public function swim();
}
```

AnimalInterfaceというインタフェースが存在し、それを継承するDogクラスとFishクラスを作ります。

```php
class Dog implements AnimalInterface
{
    public function fly()
    {
        // 何もしない
    }
    
    public function run()
    {
        var_dump('走る!');
    }
    
    public function swim()
    {
        var_dump('泳げる！');
    }
}
```

```php
class Fish implements AnimalInterface
{
    public function fly()
    {
        var_dump('飛び跳ねるかも？');
    }
    
    public function run()
    {
        // 何もしない
    }
    
    public function swim()
    {
        var_dump('泳げる！');
    }
}
```

犬は飛ばないはずですが、インターフェースによって実装が強制されているのでDogクラスでもflyメソッドの実装が必要になっています。   
Fishクラスも同じ状況ですね。不要であるrunメソッドの実装が強制されています。  
クライアント側から見るとそのクラスには必要のないメソッドが実装されており、かなり不自然に見えるのではないでしょうか。

これをISPを守るように修正します。  
インタフェースを分離し、それぞれのサブクラスで必要なインタフェースを継承するように変更します。

```php
interface AnimalFlyingInterface
{
    public function fly();
}

interface AnimalRunningInterface
{
    public function run();
}

interface AnimalSwimInterface
{
    public function swim();
}
```

```php
class Dog implements AnimalRunningInterface, AnimalSwimInterface
{    
    public function run()
    {
        var_dump('走る!');
    }
    
    public function swim()
    {
        var_dump('泳げる！');
    }
}
```

```php
class Fish implements AnimalFlyingInterface, AnimalSwimInterface
{
    public function fly()
    {
        var_dump('飛び跳ねるかも？');
    }
    
    public function swim()
    {
        var_dump('泳げる！');
    }
}
```

これで必要なインタフェースだけを継承できるようになりました。

[^1]: https://medium.com/better-programming/solid-principles-simple-and-easy-explanation-f57d86c47a7f
