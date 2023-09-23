'use client'

import { HTMLProps, useEffect, useState } from 'react'
import styles from './page.module.scss'
import ChatHeader from '@/components/chatHeader/chatHeader'
import ChatHistory from '@/components/chatHistory/chatHistory'
import ChatFooter from '@/components/chatFooter/chatFooter'
import { getChatHistory } from '@/libs/api/getChatHistory' 
import { useChatStore } from '@/libs/stores/useChatStore'
import { Message } from '@/libs/types'

export default function Home(props: HTMLProps<HTMLDivElement>) {
  const [chatData, setChatData] = useState<Message[]>([]);
  const setChatHistory = useChatStore((state) => state.setChatHistory);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const data = await getChatHistory();
        if (!data) return; 
        setChatData(data);
        setChatHistory(data);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchChatHistory();
  }, [setChatHistory]);

  return (
    <main className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <ChatHeader/> 
      <ChatHistory value={chatData}/> 
      <ChatFooter/>
    </main>
  )
}
