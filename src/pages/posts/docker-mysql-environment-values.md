---
title: "docker-composeのMySQLのイメージの環境変数"
tags: ["Docker"]
date: "2020/09/05 00:00:00"
---

docker-composeでコンテナ内で環境変数を設定するには、docker-compose.ymlでenvironmentキーを使って指定します。

<a href="https://hub.docker.com/_/mysql" target="_blank">Docker Hub</a>

現在サポートしているMySQLのバージョンは以下の通りです。

> 8.0.21,  8.0, 8, latest  
> 5.7.31,  5.7, 5  
> 5.6.49, 5.6

## 設定できる環境変数

よく使うものだけピックアップします。

### MYSQL_ROOT_PASSWORD

MySQLのrootユーザのパスワードです。必須で設定が必要です。

### MYSQL_DATABASE

データベースの名前です。

### MYSQL_USER

MySQLに接続するユーザの名前です。ユーザを作成する場合はMYSQL_PASSWORDの設定も必要になります。

このユーザは、MYSQL_DATABASEで設定したデータベースに対してGRANT ALLの権限が付与されます。

### MYSQL_PASSWORD

MYSQL_USERで設定したユーザのパスワードです。

以上がよく使う環境変数です。これとは別で、環境変数に使えない(というより設定した場合に問題が発生する)変数もあります。

<a href="https://dev.mysql.com/doc/refman/5.7/en/environment-variables.html" target="_blank">MySQL :: MySQL 5.7 Reference Manual :: 4.9 Environment Variables</a>

## サンプルのdocker-compose.yml

完成系のサンプルです。  
（今試している対象のシステムがかなりレガシーなので、古めのMySQLのバージョンを指定しています）

```yml[docker-compose.yml]
version: '3'
services:
 mysql:
   image: mysql:5.6
   container_name: mysql
   environment:
     MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
     MYSQL_USER: ${MYSQL_USER}
     MYSQL_PASSWORD: ${MYSQL_PASSWORD}
```

```yml[.env]
MYSQL_ROOT_PASSWORD=adminpassword
MYSQL_USER=testuser
MYSQL_PASSWORD=testpassword
```
