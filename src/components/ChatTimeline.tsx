import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChatItem } from '@/components/ChatItem'
import { InputForm } from '@/components/InputForm'
import { ThreeDotsLoader } from '@/components/ThreeDotsLoader'
import {
  DEFAULT_SYSTEM_PROMPT,
  DEFAULT_ASSISTANT_MESSAGE,
  DEFAULT_INTERRUPT_SYSTEM_PROMPT,
  DEFAULT_CHAT_COMPLETION_OPTION,
} from '@/constants'
import { Message, MessageWithDebug } from '@/types/custom'

type Props = {}

export const ChatTimeline: React.FC<Props> = () => {
  const [chats, setChats] = useState<MessageWithDebug[]>([
    {
      role: 'system',
      content: DEFAULT_SYSTEM_PROMPT,
    },
    {
      role: 'assistant',
      content: DEFAULT_ASSISTANT_MESSAGE,
    },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [interruptSystemPrompt, setInterruptSystemPrompt] = useState(DEFAULT_INTERRUPT_SYSTEM_PROMPT)

  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true)
      setChats((prev) => {
        return [...prev, message]
      })

      const requestOption = {
        ...DEFAULT_CHAT_COMPLETION_OPTION,
        messages: [
          // {
          //   role: 'system',
          //   content: interruptSystemPrompt,
          // },
          ...chats,
          message,
        ].map((d) => ({
          role: d.role,
          content: d.content,
        })),
      }

      console.log('このmessageでAPIを叩きます:', requestOption)

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestOption),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`)
      }
      console.log('APIからのレスポンス data.result.usage', data.result.usage)
      setChats((prev) => [
        ...prev,
        {
          ...data.result.choices[0].message,
          // debug: data.result.usage, // MEMO: デバッグ情報としてtoken使用量を発言に含める
        } as MessageWithDebug,
      ])
    } catch (error) {
      console.log(error)
      setChats((prev) => [...prev, { role: 'assistant', content: error.message }])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full h-full mx-auto max-w-[40rem]">
      <div className="mb-10 p-4 pb-[240px]">
        <AnimatePresence>
          {chats.slice(1, chats.length).map((chat, index) => {
            return (
              <ChatItem
                role={chat.role}
                content={chat.content}
                // debug={chat.debug}
                key={index}
              />
            )
          })}
        </AnimatePresence>
        {isSubmitting && (
          <div className="py-2">
            <ThreeDotsLoader />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        {/* <div className="text-micro mb-4">
          <p className="mb-1">debug prompt: </p>
          <textarea
            className="w-full p-2 pr-12 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 min-h-[50px] max-h-[50px]"
            placeholder="debug prompt"
            value={interruptSystemPrompt}
            onChange={(e) => setInterruptSystemPrompt(e.target.value)}
          />
        </div> */}
        <InputForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
