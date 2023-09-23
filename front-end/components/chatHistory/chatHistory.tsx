'use client'

import _ from 'lodash' 

import styles from './chatHistory.module.scss'
import { useChatStore } from '@/libs/stores/useChatStore'
import { Message } from '@/libs/types'
import { UserCircle } from 'lucide-react'
import { useEffect } from 'react'

type ChatHistoryProps = {
    value: Message[]
} 

export default function ChatHistory(props: ChatHistoryProps) {
    const generateUniqueId = () => Date.now() + Math.random().toString(36).substr(2, 5);
    
    const chatHistory = useChatStore((state) => state.chatHistory) 
    const setChatHistory = useChatStore((state) => state.setChatHistory) 

    useEffect(() => {
        chatHistory ? setChatHistory(chatHistory) : setChatHistory([]); 
    }, [chatHistory, setChatHistory])

    const omitedProps = _.omit(props, ['message', 'isBot']) 

  return (
    <div {...omitedProps} className={styles['wrapper']}>
        {_.map(chatHistory, (item) => ( 
         item.isBot ? (
            <div key={generateUniqueId()} className={styles['bot-message']}>
                <div className={styles['bot-container']}>
                    <div className={styles['text-bot']}>{item.value}</div>
                    <div className={styles['txt-block'] + ' ' + styles['bot']}>
                        <UserCircle size={28} color="red" />
                        <p className={styles['text']}>Поддержка</p>
                    </div>
                </div>
            </div>
         ) : (
            <div key={generateUniqueId()} className={styles['client-message']}>
                <div className={styles['client-container']}>
                    <div className={styles['text-client']}>
                        {item.value}
                    </div> 
                    <div className={styles['txt-block']}>
                        <div className={styles['text']}>Вы</div>
                    </div>
                </div>
            </div>
         )
        ))}
    </div>
  )
}   