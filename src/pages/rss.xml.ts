import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'kanae.dev',
  description: 'I am writing about my daily life.',
  site: import.meta.env.SITE,
  // 出力されるXMLの<item>のリスト
  // 簡単な例: src/pagesにあるマークダウンファイルからそれぞれitemsを生成する
  // 必要なfrontmatterや複雑なユースケースに関しては「`items`の生成」セクションをご覧ください。
  items: import.meta.glob('./posts/**/*.md'),
  // (任意) カスタムxmlを利用する
  customData: `<language>en-us</language>`,
});
