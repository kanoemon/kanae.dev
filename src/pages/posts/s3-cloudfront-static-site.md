---
title: S3とCloudFrontで静的Webサイトをつくる
tags: ["AWS"]
date: "2020/02/16 00:00:00"
---

S3でホストされている静的WebサイトにCloudFrontをかませる方法です。AWSクラウドデザインパターンのCache Distributionパターンにあたるサーバ構成です。
今回は、S3をPublicにし、オリジンサーバに直接アクセスしても問題ないという前提で進めます。
(S3に直接アクセスさせずCloudFrontからのみアクセスさせたい場合、CloudFrontのOAIという機能を使うことで実現可能です)

<a href="https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html" target="_blank">
オリジンアクセスアイデンティティを使用して Amazon S3 コンテンツへのアクセスを制限する</a>

## 言わずもがなのCloudFrontを使うメリット
ユーザから物理的に近いキャッシュサーバからWebサイトが配信されるので、レスポンスが速くなります。また、オリジンサーバの負荷軽減の効果もあります。

## S3バケットを作成する
オリジンサーバにあたるS3のバケットを作成し、コンテンツを配置します。

1. S3のコンソールからバケットを作成し、「static website hosting」を有効にします
2. バケットのアクセス権限を、Webサイトへのアクセスに必要な権限へ変更します

2-1. ブロックパブリックアクセスの設定をすべてオフにします  
2-2. バケットポリシーを下記に変更します

```json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::bucket-name/*"
       }
   ]
}
```
※bucket-nameを自身のバケットの名前に変更してください。

権限が正常に変更できていれば、アクセス権限のタブに「パブリック」のテキストが表示されるようになります。

3. S3のバケットに静的Webサイトのファイルをアップロードします
4. プロパティ＞web static hostingに表示されているエンドポイントのURLにアクセスし、Webサイトが表示されていればOKです。ちなみに、このエンドポイントのURLはCloudFrontの設定でも必要になります。

## CloudFrontの設定を行う
CloudFrontと先ほど作ったS3を連携させます。

1. CloudFrontのコンソールから、webディストリビューションを作成します

「Origin Domain Name」はS3のweb static hostingのエンドポイントのURLから「http:\//」を除いたものを設定します。他項目については、必要に応じて設定を行ってください。デフォルトのままでも動作に問題はありません。

2. CloudFrontのコンソールから、作成したディストリビューションを選択します。「General」タブの「Domain Name」に表示されているドメインでブラウザからアクセスし、Webサイトが確認できればOKです。
