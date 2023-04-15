export type Message = {
  role: 'system' | 'assistant' | 'user'
  content: string
}

export type MessageWithDebug = Message & {
  debug?: any
}

/**
 * https://platform.openai.com/docs/api-reference/chat
 */
export type ChatCompletionOptionType = {
  model: string
  messages: Array<string>
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  stop?: string | Array<string> | null
  max_tokens?: number
  presence_penalty?: number
  frequency_penalty?: number
  logit_bias?: { [key: number]: number }
  user?: string
}
