'use client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { AppHeader } from '@/components/AppHeader'
import { ChatTimeline } from '@/components/ChatTimeline'
import { APP_TITLE } from '@/constants'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <AppHeader />
      <main className="pt-[64px] relative h-[100svh] md:h-screen flex z-10 bg-slate-200">
        <div className="flex-1 overflow-auto relative">
          <ChatTimeline />
        </div>
      </main>
    </>
  )
}

export default Home
