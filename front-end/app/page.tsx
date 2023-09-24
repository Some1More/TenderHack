'use client'

import { HTMLProps } from 'react'
import styles from './page.module.scss'
import ChatHeader from '@/components/chatHeader/chatHeader'
import ChatHistory from '@/components/chatHistory/chatHistory'
import ChatFooter from '@/components/chatFooter/chatFooter' 
import useChatHistory from '@/libs/hooks/useChatHistory' 

export default function Home(props: HTMLProps<HTMLDivElement>) {
  const { chatData, isError, refetchChatHistory } = useChatHistory();

  if (isError) {
    return <p>Error fetching chat data</p>;
  }

  return ( 
      <main className={(props.className ?? '') + ' ' + styles['wrapper']}>
        <ChatHeader />
        <ChatHistory />
        <ChatFooter />
      </main> 
  );
}
