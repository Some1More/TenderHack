'use client'

import _ from 'lodash'

import React, { HTMLProps } from 'react' 
import styles from './chatHistory.module.scss'
import { useChatStore } from '@/lib/stores/useChatStore'
import { Message } from '@/lib/types'
import { UserCircle } from 'lucide-react'

type ChatHistoryProps = {
    value: Message[]
} 

export default function ChatHistory(props: ChatHistoryProps) {
    const chatHistory = useChatStore((state) => state.chatHistory) 
    const setChatHistory = useChatStore((state) => state.setChatHistory) 
    chatHistory ? setChatHistory(chatHistory) : setChatHistory([]);

    const omitedProps = _.omit(props, ['message', 'isBot'])

  return (
    <div {...omitedProps} className={styles['wrapper']}>
        {_.map(chatHistory, (item) => ( 
         item.isBot ? (
            <div className={styles['bot-message']}>
                <div className={styles['bot-container']}>
                    <div className={styles['text-bot']}>{item.value}</div>
                    <div className={styles['txt-block'] + ' ' + styles['bot']}>
                        <UserCircle size={28} color="red" />
                        <p className={styles['text']}>Поддержка</p>
                    </div>
                </div>
            </div>
         ) : (
            <div className={styles['client-message']}>
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