import { HTMLProps } from 'react'
import styles from './page.module.scss'
import ChatHeader from '@/components/chatHeader/chatHeader'
import ChatHistory from '@/components/chatHistory/chatHistory'
import ChatFooter from '@/components/chatFooter/chatFooter'
import { getChatHistory } from '@/lib/api/getChatHistory' 
import { useChatStore } from '@/lib/stores/useChatStore'

export default async function Home(props: HTMLProps<HTMLDivElement>) {
  const chatHistory = await getChatHistory(); 

  return (
    <main className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <ChatHeader/> 
      <ChatHistory value={chatHistory ? chatHistory : []}/> 
      <ChatFooter/>
    </main>
  )
}
