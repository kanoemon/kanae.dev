---
title: 依存関係逆転の原則(Dependency Inversion Principle)
tags: ["プログラミング", "設計"]
date: "2020/11/21 00:00:00"
---

依存関係逆転の原則(Dependency Inversion Principle)とはモジュールを疎結合に保つための原則です。

> どのような場合でも、下位レベルのコンポーネントが上位レベルのコンポーネントに依存するように設計する。[^1]

下位レベルのコンポーネントとは変更頻度が高く、変更理由がそれほど重要ではありません。  
そのため、安定度は低くてもいいですが、柔軟性が求められます。  
例えば、viewやcontrollerはこれに当たります。  

上位レベルのコンポーネントは逆に変更頻度は低く、変更が発生する理由には大きな意味があります。  
安定度の高さを求められますが、柔軟性はそこまで求められません。  
どのコンポーネントが上位レベルに当たるかはそのシステムが適用しているアーキテクチャによりますが、  
Clean Architectureではビジネスやアーキテクチャの方針を決めるものが上位レベルのコンポーネントだと述べています。  
DDDで言えばドメインモデルはこれに該当します。

ではコンポーネントが別のコンポーネントに依存している場合、何が起きているのでしょうか？

依存関係が成り立つとき、依存する側は安定度が低く、柔軟性が高くなります。  
一方、依存される側は安定度が高く、柔軟性は低くなります。

そのため、柔軟性が求められる下位レベルのコンポーネントは依存する側へ、  
安定度が求められる上位レベルのコンポーネントは依存される側になるように実装した方がよいのです。

何も考慮しないで実装していくと、上位レベルのコンポーネントが下位レベルのコンポーネントに依存していくことがあります。  
どちらかというと、この依存関係で実装されるケースの方が多いと思います。

このとき、どうやって依存関係を逆転させたらよいのでしょうか？

この逆転を実現するための方法がDIPなのです。

## コードで理解するDIP

DIPを使って、下位レベルと上位レベルの依存関係を逆転してみます。

### 0. before

まずはbeforeです。  
BookはBookRepositoryに依存しています。

```php
namespace App\Domain;

use App\Repository\BookRepository;

class Book
{
    public function get($id)
    {
        $bookRepository = new BookRepository();
        return $bookRepository->findById($id);
    }
}
```

### 1. 依存性の注入(DI)

BookRepositoryをDIします。  
この時点では依存関係はまだ変わっていません。  
まだBookはBookRepositoryへ依存しています。

```php
namespace App\Domain;

use App\Repository\BookRepository;

class Book
{
    public function get($id, BookRepository $repository)
    {
        return $repository->findById($id);
    }
}
```

### 2. インタフェースの導入

BookRepositoryにインタフェースを定義し、getの型宣言をIBookRepositoryへ変更しました。  
これでBookはBookRepositoryに依存しなくなりました。  

```php
namespace App\Domain;

use App\Repository\IBookRepository;

class Book
{
    public function get($id, IBookRepository $repository)
    {
        return $repository->findById($id);
    }
}
```

ですがコンポーネントでみると依存関係は変わっていません。  
Repository内にあるIBookRepositoryに依存しているため、  
DomainはRepositoryに依存している状態のままになっています。

### 3. インタフェースのコンポーネントの移動

IBookRepositoryをDomainへ移動しました。
これでコンポーネント単位でも依存関係が逆転しました。

```php
namespace App\Domain;

use App\Domain\IBookRepository;

class Book
{
    public function get($id, IBookRepository $repository)
    {
        return $repository->findById($id);
    }
}
```

このようにインターフェースや抽象に依存させることで依存関係を逆転させることをDIPと言います。

[^1]: Ｒｏｂｅｒｔ Ｃ．Ｍａｒｔｉｎ,角 征典,高木 正弘. Clean Architecture　達人に学ぶソフトウェアの構造と設計
