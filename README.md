# meal mood

気分、天気、運動量、体力、食材、お酒に合わせて今日の一皿を提案する小さなWebアプリです。

## GitHub Pages

`index.html` をそのまま公開できます。GitHub Pagesでは安全にAPIキーを置けないため、AIサーバーがない場合はブラウザ内のローカル提案に自動で切り替わります。

## AIを使う場合

Vercelなどにこのリポジトリを接続して、環境変数 `GEMINI_API_KEY` を設定してください。必要なら `GEMINI_MODEL` でモデルを変更できます。未設定の場合は `gemini-2.5-flash` を使います。

OpenAIで動かしたい場合は `OPENAI_API_KEY` と、必要に応じて `OPENAI_MODEL` も使えます。`GEMINI_API_KEY` がある場合はGeminiを優先します。
