import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChatItem } from '@/components/ChatItem'
import { InputForm } from '@/components/InputForm'
import { ThreeDotsLoader } from '@/components/ThreeDotsLoader'
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_ASSISTANT_MESSAGE, DEFAULT_CHAT_COMPLETION_OPTION } from '@/constants'
import { Message } from '@/types/custom'

type Props = {}

export const ChatTimeline: React.FC<Props> = () => {
  const [chats, setChats] = useState<Message[]>([
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
  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true)
      setChats((prev) => {
        return [...prev, message]
      })

      const requestOption = {
        ...DEFAULT_CHAT_COMPLETION_OPTION,
        messages: [...chats, message].map((d) => ({
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
      // console.log('APIからのレスポンス data.result.usage', data.result.usage)
      setChats((prev) => [
        ...prev,
        {
          ...data.result.choices[0].message,
        } as Message,
      ])
    } catch (error) {
      console.log(error)
      const errorMessage = error instanceof Error ? error.message : 'エラーが発生しました';
      setChats((prev) => [...prev, { role: 'assistant', content: errorMessage }])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full h-full mx-auto max-w-[40rem]">
      <div className="mb-10 p-4 pb-[240px]">
        <AnimatePresence>
          {chats.slice(1, chats.length).map((chat, index) => {
            return <ChatItem role={chat.role} content={chat.content} key={index} />
          })}
        </AnimatePresence>
        {isSubmitting && (
          <div className="py-2">
            <ThreeDotsLoader />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <InputForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
