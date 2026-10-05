# カニ・クリーム・コロッケ 組み合わせプレビュー＆調整ツール v4

Canvas ベースで組み直した版です。

## 重要な変更
- `renderer.js` を追加
- プレビュー用 `index.html` と、ゲーム側サンプル `game_renderer_example.html` が **同じ Canvas レンダラー** を使います
- ツールで位置を合わせた後、そのままゲーム本体へ寄せやすい構造です

## ファイル
- `index.html` … 調整ツール本体
- `renderer.js` … 共通レンダラー
- `game_renderer_example.html` … ゲーム本体側を想定した描画サンプル
- `assets/` … 素材シート

## 使い方のおすすめ
1. `index.html` を開く
2. カニ + クリーム を基準に調整
3. テンプレ保存
4. `game_renderer_example.html` で同じ描画方式を確認

## ポイント
今後ゲーム本体でも `renderer.js` を使えば、
「ツールでは合っていたのにゲームでズレる」をかなり減らせます。
