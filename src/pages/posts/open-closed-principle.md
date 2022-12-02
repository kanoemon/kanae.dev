---
title: オープン・クローズドの原則(Open-Closed Principle)
tags: ["プログラミング", "設計"]
date: "2020/10/27 00:00:00"
---

オープン・クローズドの原則(Open-Closed Principle)。  
日本語だと開放閉鎖の原則って呼ばれることもあるみたいです。  
なんだか堅っ苦しく聞こえますね。

OCPは1988年にBertrand Meyerが生み出したとされている原則です。

> ソフトウェアの実態(クラス、モジュール、関数など)は  
> 拡張に対して開いていなければならず、しかし一方で、  
> 変更に対しては閉じてなければならない [^1]

要は機能を拡張するときに変更が発生しないようにしようってことです。 

ソフトウェアは存在しうる限り拡張や変更が行われ続けることになります。  
そのため、拡張や変更に対して安定し、かつ柔軟に対応できるような柔らかい設計が求められることになります。

逆の硬い設計はどんなものかというと、どこか一箇所を変更しようとするといろんな箇所にも変更が発生してしまうような作りのことです。

以下はOCPを違反している例です。

```php[client.php]
// 機能呼び出し側
$userService->charge('credit', $user);
```

```php[UserService.php]
class UserService
{
    public function charge($type, $user)
    {
        if ($type === 'credit') {
            $creditCard = new CreditCard();
            $creditCard->charge($user, 10000);
        } elseif ($type === 'applepay') {
            $applePay = new ApplePay();
            $applePay->charge($user, 10000);
        }
    }
}
```

```php[CreditCard.php]
class CreditCard
{
  public function charge($user, $money)
  {
  }
}
```

ここに新しくLINE Payを追加したくなった場合、どんな変更が発生するでしょうか？

まず、LinePayというクラスを作ってchargeメソッドを用意します。  
そのあとUserServiceクラスのchargeメソッドに条件分岐を追加して、LINE Payのインスタンスを生成してchargeメソッドを呼びだすという変更を加えるでしょう。

はい、変更を加えないといけないのです。

このコードのままだと、LINE Payの機能追加に対してUserServiceを変更しないといけません。  
変更に閉じてません。

これをOCPを守るようにリファクタリングします。

```php[client.php]
$userService->charge(new CreditCard(), $user);
```

```php[UserService.php]
class UserService
{
    public function charge(AbstractWallet $wallet, $user)
    {
        $wallet->charge($user, 10000);
    }
}
```

```php[CreditCard.php]
class CreditCard extends AbstractWallet
{
  public function charge($user, $money)
  {
  }
}
```

```php[AbstractWallet.php]
abstract class AbstractWallet
{
  abstract public function charge($user, $money);
}
```

抽象クラスのAbstractWalletを新規で作り、UserServiceから対象のインスタンスを渡してもらうように変えました。

このリファクタリングの結果、LINE Payを増やす時はAbstractWalletを継承したLinePayクラスを新しく作るだけで機能追加が可能になりました。

このようにOCPは抽象クラス、もしくはインタフェースを活用することで実現することができます。  
「Program to an interface, not an implementation」ですね。  

[^1]: https://drive.google.com/file/d/1nKUab5pOJoaH0e8ZDmRWjc2Cr8DQWLD7/view
