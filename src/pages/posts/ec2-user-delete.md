---
title: EC2からec2-userを削除する
tags: ["AWS", "Linux"]
date: "2020/12/13 00:00:00"
---

EC2のデフォルトユーザ、ec2-userを削除して使えなくする流れです。

## ユーザの作成

ec2-userに代わる新しいユーザを作成します。

```
$ sudo adduser hoge
$ sudo passwd hoge
```

## sudo権限の付与

次に作成したユーザにroot権限を付与していきます。
まずwheelグループに作成したユーザを追加します。

```bash
$ usermod -aG wheel hoge
```

そのあと、/etc/sudoers.d/配下にユーザごとのテキストファイルを作成し、パスワードなしでsudoを使えるようにしておきます。

```bash
echo "hoge ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/hoge
```
## ec2-userの権限のコピー

ec2-userの.sshを作成したユーザへコピーします。

```bash
$ sudo cp –arp /home/ec2-user/.ssh /home/hoge/
$ sudo chown -R hoge:hoge /home/hoge/.ssh
```

これで代わりのユーザ作成は終わりです。

## ec2-userの削除

最後にec2-userを削除して完了です。

```bash
$ sudo userdel -r ec2-user
```
