---
title: DockerでPHP+Apacheの環境を構築する
tags: ["Docker"]
date: "2021/05/05 00:00:00"
---

仕事で本格的にDockerを触ることになりそうなので、Dockerを勉強しています。  
今回はシンプルなPHPとApacheの環境をDockerで構築してみます。

## Dockerfileの作成

https://hub.docker.com/_/php

Docker Hub上からApacheを含むPHPの公式イメージが提供されているので、そちらを使います。  
デフォルトではドキュメントルートは/var/www/htmlになります。

```docker
# Dockerfile
FROM php:7.2-apache
COPY src/ /var/www/html/
```

ドキュメントルートを変更したい場合は、APACHE_DOCUMENT_ROOTの環境変数に新しいドキュメントルートのパスを設定することができます。  
sedコマンドを使ってapacheのconfファイルのドキュメントルートの設定も書き換える必要があります。

```docker
# Dockerfile
FROM php:7.2-apache
ENV APACHE_DOCUMENT_ROOT /var/www/new/html/
COPY src/ /var/www/new/html/

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
```

## コンテナの立ち上げ

Dockerfileからイメージをビルドします。

```bash
$ docker build -t my-php-app .
```

ビルドが終わったらコンテナを立ち上げます。  

```bash
# コンテナをバックグラウンドで実行し、コンソールにコンテナ ID を表示します
# http://localhost:8000/でブラウザからアクセスできるようになる
$ docker run --publish 8000:80 --detach --name my-running-app my-php-app
```

## コードの即時反映

開発環境として使う場合、ソースを変更すると毎回イメージをビルドし直す必要があり手間が発生します。  
コンテナを立ち上げる場合に-vオプションを使うとローカルのソースをコンテナ内にマウントさせることができます。  
これを使うことでローカルのコードの即時反映が可能になります。

```bash
$ docker run -v /xxxx/src/:/var/www/html --publish 8000:80 --detach --name my-running-app my-php-app
```

## 最後に

https://github.com/kanoemon/sandbox-docker/tree/master/php-web-apache

コードはGithubにも載せています。

