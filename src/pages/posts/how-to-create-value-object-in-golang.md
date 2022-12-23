---
layout: ../../layouts/PostLayout.astro
title: Goで値オブジェクトを実装する
tags: ["go", "ddd"]
date: 2022-11-03T00:00:00.001Z
---

Goで値オブジェクトってどんなふうに実装されることが多いんだろうと調べていたのですが、自分の中でこの実装方法が良さそうと落ち着いたのでまとめます。

## 値オブジェクトとは
値オブジェクトはDDDを構成する要素の1つとしてよく知られていますが、いわゆるデザインパターンの1つです。システムで扱う値を表現するために使われます。  

値オブジェクトの性質としては以下が挙げられます。

- 不変である
- 交換が可能である
- 等価性によって比較される

値オブジェクトを実装するときは、これらの性質を守るような実装をする必要があります。

## Goでの値オブジェクトの実装
### typeでプリミティブ型を定義する場合
一番単純な例として、typeでプリミティブ型の型エイリアスを作るケースが考えられます。

```go
package main

import (
	"fmt"
	"reflect"
)

type Name string

func (n *Name) Equals(v *Name) bool {
	return reflect.DeepEqual(n, v)
}

func main() {
	n1 := Name("suzuki")
	n2 := Name("sato")

	fmt.Println(n1)
	fmt.Println(n1.Equals(&n2))
}
```

この実装方法だと値オブジェクトに有効な値が設定されているかを担保することができません。例えばName型は空文字は設定できないようにしたくても、上記の実装方法だと防ぐことができません。

不正な値かをチェックするバリデーション用のメソッドを作ることも考えられるでしょう。あるいは、値を設定するためのメソッドを作り、そのメソッドの中で不正な値を弾くこともできるでしょう。  
ただそのメソッドを使って値オブジェクトを作るかは作成する側に委ねられるため、必ずそのメソッドを使ってもらえるとは限りません。何より値を設定するためのメソッドを作って公開することで自由に値オブジェクトを書き変えられるようになり、不変性という性質を守ることができなくなってしまいます。

### 構造体でコンストラクタを用意する場合
```go
package main

import (
	"fmt"
	"reflect"
)

type Name struct {
	Value string
}

func NewName(n string) (*Name, error) {
	if n == "" {
		return &Name{}, errors.New("empty")
	}
	return &Name{n}, nil
}

func (n *Name) Equals(v *Name) bool {
	return reflect.DeepEqual(n, v)
}

func main() {
	n1, _ := NewName("suzuki")
	n2, _ := NewName("sato")

	fmt.Println(n1.Value)
	fmt.Println(n1.Equals(n2))
}
```

先ほどstring型にしていたものを構造体に変更し、さらにオブジェクトを生成するためのコンストラクタのメソッドを用意しました。これでオブジェクト生成時に無効な値を弾くことができるようになりました。  
ただ問題はまだ残ります。構造体のフィールドを公開しているので値が書き変えることができてしまうのです。

```go
func main() {
	n1, _ := NewName("suzuki")
	n2, _ := NewName("sato")

	n2.Value = "tanaka" 
```

これを防ぐには構造体のフィールドを非公開にする必要があります。

```go
package main

import (
	"errors"
	"fmt"
	"reflect"
)

type Name struct {
	value string
}

func NewName(n string) (*Name, error) {
	if n == "" {
		return &Name{}, errors.New("empty")
	}
	return &Name{n}, nil
}

func (n *Name) String() string {
	return (*n).value
}

func (n *Name) Equals(v *Name) bool {
	return reflect.DeepEqual(n, v)
}

func main() {
	n1, _ := NewName("suzuki")
	n2, _ := NewName("sato")

	fmt.Println(n1.String())
	fmt.Println(n1.Equals(n2))

	n2.Value = "tanaka" // n2.Value undefined (type *Name has no field or method Value, but does have value)
	fmt.Println(n1.Equals(n2))
}
```

これで値オブジェクトを書き変えることができなくなりました。  
またフィールドを非公開にしてオブジェクトを使用する側から値を参照できなくなったので、参照するためのString()メソッドを追加しました。

## まとめ
Goで値オブジェクトを実装するときは、コンストラクタを用意して無効な値は入らないようにすること、またフィールドは非公開にして外部から自由に値オブジェクトを書き変えられないようにすることを守るように実装すると良さそうです。

## 参考
- 値オブジェクトを実装する
    - https://learn.microsoft.com/ja-jp/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/implement-value-objects
- ドメイン駆動設計入門 ボトムアップでわかる！ドメイン駆動設計の基本
