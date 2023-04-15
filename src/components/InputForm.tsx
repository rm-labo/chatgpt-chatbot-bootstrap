import { Icon } from '@iconify/react'
import { Button, Tooltip } from '@mantine/core'
import React, { useRef } from 'react'
import { Message } from '@/types/custom'

type InputFormProps = {
  onSubmit: (message: Message) => Promise<void>
}

export const InputForm = ({ onSubmit }: InputFormProps) => {
  // input要素への参照を作成
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // input要素から直接値を取得
    const inputValue = inputRef.current?.value
    if (inputValue) {
      onSubmit({
        role: 'user',
        content: inputValue,
      })
      inputRef.current.value = ''
    }
  }

  // cmd + enter で送信
  const cmdKeyRef = useRef(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Meta') {
      cmdKeyRef.current = true
    } else if (e.key === 'Enter' && cmdKeyRef.current) {
      handleSubmit(e)
    }
  }
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Meta') {
      cmdKeyRef.current = false
    }
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="relative">
        <textarea
          ref={inputRef}
          rows={2}
          className="w-full px-4 py-4 pr-12 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 align-bottom min-h-[82px] max-h-[82px]"
          placeholder="メッセージを入力..."
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <Tooltip label="⌘ + Enter">
          <Button type="submit" className="absolute bottom-3 right-3 ml-4 p-0 bg-blue-500 w-[2.25rem] h-[2.25rem]">
            <Icon icon="heroicons:paper-airplane" />
          </Button>
        </Tooltip>
      </div>
    </form>
  )
}
