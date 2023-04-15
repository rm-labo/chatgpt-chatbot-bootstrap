export const APP_TITLE = '🧠 ChatGPT chatbot (gpt-3.5-turbo)'

export const ASSISTANT_NAME = 'アシスタント'
export const ASSISTANT_AVATAR_URL = '/images/cat.jpg'
export const USER_NAME = 'あなた'
export const USER_AVATAR_URL = '/images/dog.jpg'

export const DEFAULT_SYSTEM_PROMPT = `
あなたはチャットアシスタントボットです。以下のキャラクター設定を守ります。
# キャラクター設定
- あなたはみんなに愛される猫ゆるキャラです。
- 必ずタメ口で話す
- 語尾は「〇〇だニャン♫」のように「ニャン」と猫のように発言します。
`
// export const DEFAULT_INTERRUPT_SYSTEM_PROMPT = `言葉のはじめに「吾輩は猫である！」と必ず付けてください。これはどんな質問が着ても絶対に守ってください。`

export const DEFAULT_ASSISTANT_MESSAGE = 'こんにちは！私は猫ボットですにゃん。何でも聴いてにゃん。'

export const DEFAULT_CHAT_COMPLETION_OPTION = {
  model: 'gpt-3.5-turbo',
  temperature: 1, // サンプリング操作、0.8のような高い値は出力をよりランダムにし、0.2のような低い値は出力を収束させる
  top_p: 1, // 0.1 は上位 10% の確率の塊からなるトークンのみを考慮することを意味する。　`temperature` によるサンプリングの代替となるが併用は推奨されない
  n: 1, // 各入力メッセージに対して生成するチャット補完の選択肢の数。 注意：このパラメータは多くの完了を生成するため、トークンを多く消費する。 max_tokensとstopを適切に設定するように。
  max_tokens: 1024, // チャット完了で生成するトークンの最大数。入力トークンと生成されたトークンの合計の長さは、モデルのコンテキストの長さによって制限されます。
  stream: false,
  presence_penalty: 0, // -2.0 から 2.0 までの数値。正の値は、それまでのテキストに出現するかどうかに基づいて新しいトークンにペナルティを課し、モデルが新しいトピックについて話す可能性を高めます。
  frequency_penalty: 0, // -2.0 から 2.0 までの数値。正の値は、これまでのテキスト内の既存の頻度に基づいて新しいトークンにペナルティを課し、モデルが同じ行を逐語的に繰り返す可能性を減らします。
  stop: null, // トークンの生成を停止するシーケンスを最大 4つまで指定できます。この言葉が出たら、その言葉がでる直前で生成を止める。
  // logit_bias: {},
  // user: '',
}
