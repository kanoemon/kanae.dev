---
layout: ../../layouts/PostLayout.astro
title: インタラクションテストとステートテスト
tags: ["testing"]
pubDate: 2022-08-20T00:00:00.001Z
---

<a href="https://www.oreilly.co.jp/books/9784873119656/" target="_blank">Googleのソフトウェアエンジニアリング</a>を読んでいく中で、インタラクションテストとステートテストという2つのテストのタイプが出てきました。  
その2つのテストの特徴とどんなふうに使い分けすると良いのかをまとめておこうと思います。

## インタラクションテストとは
インタラクションテストとは、メソッドがどのように呼び出されているかを、実際にそのメソッドを呼び出さずにモックを使って検証するテスト方法です。

以下のユーザ登録をするregisterメソッドをテストしてみましょう。

```php
public function register(Request $request): void
{
    $user = new User($request->id, $request->name);

    if ($this->userService->exists($user)) {
        throw new Exception('すでにユーザは登録されています。');
    }

    $this->userRepository->save($user);
}
```

このメソッドのテストは次のようになります。

```php
public function testRegister()
{
    $user = new User(1, 'taro');

    $userService = $this->createMock(UserService::class);
    $userService->expects($this->once())
              ->method('exists')
              ->with($user)
              >willReturn(false);

    $userRepository = $this->createMock(UserRepository::class);
    $userRepository->expects($this->once())
              ->method('save')
              ->with($user);

    $userApplicationService = new UserApplicationService($userRepository, $userService);
    $userApplicationService->register(
        new Request(1, ' taro');
    );
}
```

まずUserServiceのモックを作成し、existsメソッドが引数$userで呼び出されることを検証します。次にUserRepositoryのモックを作成し、saveメソッドが引数$userで呼び出されることを検証します。

このようにインタラクションテストは、メソッドの実装の詳細についてテストをすることができます。

## ステートテストとは
ステートテストとは、メソッドの状態の変化の結果を検証するテスト方法です。

```php
public function testChangeName()
{
    $user = new User('taro');
    $user->changeName('kenta');
    $this->assertSame('kenta', $user->getName());
}
```

changeNameのメソッドにインプット用のデータを渡して、メソッドの返り値の検証をしています。

先ほどのインタラクションテストとは異なり、ステートテストではchange
Nameメソッドの実装の詳細に立ち入ってないことが分かります。

## インタラクションテストとステートテストの違い
インタラクションテストでは実装の詳細をテストすることができます。それはすなわち内部の処理を公開することに繋がるため、テスト対象のメソッドの変更に弱く、テストが脆くなる傾向があります。

ステートテストの方が変更に強くテストの脆さを減らすことができるため、テストコードの長期的な保守がしやすくなります。

またインタラクションテストは、本当にテスト対象のメソッドに対して信頼性のあるテストが書けていない可能性が高くなる傾向があります。
インタラクションテストではメソッドをモック化してテストを書いていきます。開発者自身がメソッドの返り値を仮定して、その仮定に対してテストを書いていくため、実際にそのメソッドが呼び出されたときの正常な動作が保証しきれないのです。

## どんなケースで使えるか？
以上の通り、基本的にはステートテストでテストを作成し、ステートテストが使えない場合にインタラクションテストを使うように使い分けすることがよさそうです。

ステートテストが使えない場合とは、外部システムに依存しているようなメソッドです。例えばログを書き込んだり、APIと通信したりするような処理が考えられると思います。

それぞれのテストタイプのメリット、デメリットを理解し、そのメソッドで何をテストすべきかを考え、信頼性があり保守しやすいテストコードを書くことを心がけたいですね。
