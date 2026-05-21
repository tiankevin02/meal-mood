# meal mood

気分、天気、運動量、体力、食材、お酒に合わせて今日の一皿を提案する小さなWebアプリです。

## GitHub Pages

`index.html` をそのまま公開できます。GitHub Pagesでは安全にAPIキーを置けないため、AIサーバーがない場合はブラウザ内のローカル提案に自動で切り替わります。

## AIを使う場合

Vercelなどにこのリポジトリを接続して、環境変数 `OPENAI_API_KEY` を設定してください。必要なら `OPENAI_MODEL` でモデルを変更できます。未設定の場合は `gpt-5.4-mini` を使います。
