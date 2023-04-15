# ChatGPT API app

openai API を使った簡易的なチャットボット。
主に調査・学習目的。

## 導入方法

- [OpenAI API](https://platform.openai.com/)のアカウントを作成する
- `.env.local`ファイルを作成する
- [ここから](https://platform.openai.com/account/api-keys)API keyの取得を行う
- `+ Create new secret key`ボタンから新しい`SECRET KEY`を表示し、コピーをしておく
- `.env.local` に`OPENAI_API_KEY`にコピーしたAPI keyを設定する

## 設定

- `/src/constants/index.ts` で各パラメータを定数管理しています。
