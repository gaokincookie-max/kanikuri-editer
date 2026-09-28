# カニ・クリーム・コロッケ 料理プレビュー調整ツール

`index.html` をブラウザで開いて使用します。GitHub Pages / Netlify でも動かせます。

## 主機能：料理プレビュー
起動すると、こちらで組んだ原案プリセットが最初から入っています。

- 01 カニ＋クリーム
- 02 カニカマ＋クリーム
- 03 昆布＋謎の液体
- 04 カニ＋マヨ＋焦げ
- 05 カニカマ＋ヨーグルト＋逃走
- 06 カニ＋クリーム＋DJ

左上の「原案プレビュー」で切り替えられます。
また、液体 / 具 / 仕上げ / 追加パーツを選んで任意の組み合わせを生成できます。

各レイヤーは以下を手動調整できます。

- ドラッグによる位置移動
- X / Y
- 拡大率
- 回転
- 透明度
- 左右反転
- 重なり順
- 複製 / 削除

調整した見た目は「現在配置を保存」で料理パターンとして保存できます。

## 補助機能：切り抜き
自動で切り出した素材がおかしい場合だけ使う想定です。

- 矩形
- 多角形
- フリーハンド
- 透明領域からの自動分割
- 透明余白のトリミング

元の3枚の素材シートも `sources/` に同梱しています。
切り直した素材はそのまま料理プレビューへ登録できます。

## ゲームへ持っていく
上部の「ゲーム用ZIP」を押すと、

- `dish_assets.json`
- `assets/*.png`
- README

を含むZIPを書き出します。
`dish_assets.json` の `recipes` に、手動調整したレイヤー配置（assetId / x / y / scale / rot / opacity / flip）が保存されます。

このデータをゲーム側で同じ順に描画すれば、ツール上の見た目をそのまま再現できます。


## GitHub compatibility
The files under `sources/` use ASCII-only names to avoid filename encoding issues on ZIP extraction, GitHub uploads, and different operating systems.
