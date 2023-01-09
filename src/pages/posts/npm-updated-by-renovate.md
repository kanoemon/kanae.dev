---
layout: ../../layouts/PostLayout.astro
title: npmパッケージを定期的に更新する仕組み
tags: ["nodejs", "operations"]
date: 2022-09-10T00:00:00.001Z
---

この<a href="https://kanoe.dev/" target="_blank">kanoe.dev</a>のブログはNuxt.jsで作成しており、Node.jsのライブラリの定期的な更新作業が必要となっています。
今回はこのブログで行っているnpmパッケージの定期更新の方法の紹介をさせて頂きたいと思います。

## 定期更新の流れ

使用しているライブラリに新しいバージョンが出るとPull Requestが自動で作成され、Github ActionsでE2Eテストを走らせるようにしています。  
自分が実施する作業としてはPull RequestがあればCIの結果を確認し、問題なければマージするまでです。  
マージされると自動でデプロイされますが、今回はそのデプロイの仕組みは割愛させて頂きます。

では、以下で各工程の詳細を書いていきます。

## Pull Requestの自動作成

Renovateを使っています。Renovateとは依存パッケージの更新を自動化してくれるツールです。

https://github.com/renovatebot/renovate

Renovateの設定方法は公式のドキュメントを参考にしていただければ簡単に設定できると思います。

https://docs.renovatebot.com/getting-started/installing-onboarding/

設定が終わると、あとは定期的にRenovateが自動で新しいバージョンが出るとパッケージ管理のファイルを更新し、自動でPull Requestを作成してくれます。  

![RenovateのPR](/assets/images/posts/renovate-pr.png)

## アップデートの動作確認

動作はE2Eテストで担保するようにしています。E2EテストのフレームワークはPlaywrightを採用しています。  
以下はブログのトップページが表示できるかをテストしているテストコードです。

```javascript
const { test, expect } = require('@playwright/test');

test('index test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('kanoe.dev');
  await page.screenshot({ path: 'artifacts/test-reports/playwright/index.png', fullPage: true });
});
```

テスト時に画面を表示した後のキャプチャ画像も取得するようにしています。
このキャプチャ画像はGithub Actionsのartifactsを使って、Github Actions上に保存しています。

![E2Eテストのキャプチャ画像の保存先](/assets/images/posts/e2etest-capture.png)

このキャプチャ画像をダウンロードして表示崩れが起きていないかの確認をしています。表示崩れの確認は今は目視でやっています。

E2EテストはGithub Actionsで自動で走らせるようにしています。  
Github Actionsのワークフローは以下です。

```yaml
name: E2E test

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
      
      - uses: microsoft/playwright-github-action@v1

      - name: Install dependencies
        run: npm install
      
      - name: Install Chromium Playwright
        run: npx playwright install && npx playwright install-deps chromium
      
      - name: Run tests
        run: npm test

      - uses: actions/upload-artifact@v3
        if: ${{ always() }}
        with:
          name: test-artifacts
          path: artifacts/test-reports/playwright
```

あとはPR上で結果が確認できる(表示崩れは目視での確認が必要ですが)ので、成功していれば動作確認OKということになります。

![CIの結果](/assets/images/posts/ci-result.png)

## まとめ
ライブラリの更新はシステムを運用していく中で必ず発生していく作業になるので、できる限り自動化して作業に時間がかからないようにしたいですね。  
最初はRenovateのツールを導入してライブラリの更新の検知までを自動化していました。ただ個人ブログで機能も多くないとはいえ、PR作成されるたびにローカルでbuildして画面の挙動の確認する作業がだんだんと億劫になり、ライブラリの更新が滞りがちに。。。  
E2Eテストの導入して動作確認も自動化することで、週末ぽちぽちボタンを押すだけでライブラリの更新作業ができるようになり、ライブラリの更新が滞ることがなくなりました。
