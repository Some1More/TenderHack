'use client'

import _ from 'lodash' 

import styles from './chatHistory.module.scss'
import { useChatStore } from '@/libs/stores/useChatStore' 
import { UserCircle } from 'lucide-react'
import { HTMLProps, useEffect, useRef } from 'react'
import { animateScroll } from 'react-scroll';
import parseTimestamp from '@/libs/parseTimestamp' 

const scrollToBottom = () => {
    animateScroll.scrollToBottom({
        containerId: "chatContainer",
        duration: 1000
    });
}

export default function ChatHistory(props: HTMLProps<HTMLDivElement>) {
    const scrollRef = useRef<HTMLDivElement>(null)

    const generateUniqueId = () => Date.now() + Math.random().toString(36).substr(2, 5);
    
    const chatHistory = useChatStore((state) => state.chatHistory) 
    const setChatHistory = useChatStore((state) => state.setChatHistory) 

    useEffect(() => {
        chatHistory ? setChatHistory(chatHistory) : setChatHistory([]); 
        scrollToBottom(); 
    }, [chatHistory, setChatHistory]) 

  return (
    <div id='chatContainer' {...props} className={styles['wrapper']} ref={scrollRef}>
        {_.map(chatHistory, (item) => ( 
         item.isBot ? (
            <div key={generateUniqueId()} className={styles['bot-message']}>
                <div className={styles['bot-container']}>
                    <div className={styles['text-bot']}>{item.value}</div>
                    <div className={styles['txt-block'] + ' ' + styles['bot']}>
                        <UserCircle size={28} color="red" />
                        <div className={styles['text']}>Бот,</div>
                        <div className={styles['text']}>{parseTimestamp(item.creationDate)}</div>
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
                        <div className={styles['text']}>Вы,</div>
                        <div className={styles['text']}>{parseTimestamp(item.creationDate)}</div>
                    </div>
                </div>
            </div>
         )
        ))}
    </div>
  )
}   