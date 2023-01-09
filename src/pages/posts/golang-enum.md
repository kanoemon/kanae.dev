---
layout: ../../layouts/PostLayout.astro
title: Go言語でEnumを表現する
tags: ["golang"]
pubDate: 2022-09-03T00:00:00.001Z
---

GoでEnumってどう実装すればいいんだろう？と調べた時のメモ。

## Typed constantsを使用する

Goではconstとiotaを使って列挙型の定数を作成することができます。その定数に対して型を定義して使用するパターンです。

```go
package main

import "fmt"

type Size int

const (
	Small Size = iota
	Medium
	Large
)

func NewSize(s int) Size {
	return Size(s)
}

func main() {
	var s Size
    s = NewSize(0)
	fmt.Println(s)
    // Output: 0
}
```

ただしiotaは0から始まるため、上記の例だとSizeのゼロ値の0なのか、Smallの0なのか判別することが難しくなります。  
これを回避するには、Smallが1から始まるようにconstを書き換える必要があります。

```go
const (
	Small Size = 1 + iota
	Medium
	Large
)
```

もしくはconstの最初に別の定義の定数を追加する方法もあります。

```go
const (
    Unknow Size = iota   // Unknownを使用しない場合は_でも良い
	Small
	Medium
	Large
)
```

iotaで定義する以外にもconstでは文字列を定義することもできます。

```go
type Size string

const (
	Small  Size = "small"
	Medium Size = "medium"
	Large  Size = "large"
)
```

以上のようにconstで列挙型を作成することができるのですが、対象の型で宣言した変数には、任意の同じ型の値を渡すことができてしまうという問題があります。

```go
package main

import "fmt"

type Size int

const (
	Small Size = iota
	Medium
	Large
)

func NewSize(s int) Size {
	return Size(s)
}

func main() {
	var s Size
    s = NewSize(1)
	fmt.Println(s) // Output: 1

    s = NewSize(99)
	fmt.Println(s) // Output: 99  エラーにはならない
}
```

これは文字列で定義した場合も同様で、任意の文字列を設定することが可能です。

これを防ぐ方法としては、変数を生成する際に誤った値が入っていないかをチェックする実装を追加する必要があります。  
(実装方法は以下を参照)

https://go.dev/play/p/Bvc6neemVw9

## Structを使用する

次はstructで定義するパターンです。structの中はprivateでフィールドを宣言し、構造体の生成用のメソッドを用意します。  
これで誤った値が入ることを防ぐことができます。

```go
type Size struct {
	value string
}

var (
	Unknown = Size{""}
	Small   = Size{"small"}
	Medium  = Size{"medium"}
	Large   = Size{"large"}
)

func NewSize(s string) (Size, error) {
	switch s {
	case Small.value:
		return Small, nil
	case Medium.value:
		return Medium, nil
	case Large.value:
		return Large, nil
	}
	return Unknown, errors.New("unknown size")
}

func main() {
	var s Size
	s, _ = NewSize("small")
	fmt.Println(s)
}
```

constの時よりもシンプルな実装になりましたが、構造体で定義する場合にも問題はあります。  
構造体の場合は定数ではないため、変更が可能だということです。

```go
func main() {
	var s Size
	Small = Large  // こんなふうに構造体を書き換えてしまうことができる
	s, _ = NewSize("small")
	fmt.Println(s) // Output: {}
}
```

## まとめ
Goでenumを実装する方法を調べたところ、iotaを使用してconstで定義する方法が定石のようでした。  
(uberのgoのスタイルガイドではenumの実装ではiotaを使う方法が紹介されていました。  
https://github.com/uber-go/guide/blob/master/style.md#start-enums-at-one)

Structで定義する方が実装はシンプルになりますが、システムが大きくなっていく中で定義していた変数の意味合いが変わった場合に指定する文字列が変更になったりすると少し面倒になりそうですね。  
自分はconst + iotaで定義する方法が好きかもしれないなあ。
