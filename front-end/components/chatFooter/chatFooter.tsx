'use client'

import React, { HTMLProps, useEffect, useRef, useState } from 'react' 
import styles from './chatFoote.module.scss'
import { TextArea } from '../ui/textArea'
import { Paperclip, Send } from 'lucide-react'

import { useChatStore } from '@/libs/stores/useChatStore'
import { sendMessageToBot } from '@/libs/api/sendMessageToBot'

export default function ChatFooter(props: HTMLProps<HTMLDivElement>) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isHover, setIsHover] = useState<boolean>(false);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const data = useChatStore((state) => state.chatHistory)

    const onChangeHandler = () => {
        setIsActive(textRef.current?.value !== '');
    } 
    const onHoverHandler = () => {
        setIsHover(!isHover);
    }
    const onClickHandler = async () => {
        const inputValue = textRef.current?.value;  
        if (!inputValue) return; 

        useChatStore.getState().addMessage({ value: inputValue, isBot: false});
        
        const answer = await sendMessageToBot(inputValue); 
        if (!answer) return;

        useChatStore.getState().addMessage(answer);
        
        textRef.current.value = '';
    } 
    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault(); 

          onClickHandler();
        }
    };

    return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
        <Paperclip size={38} color={isHover ? 'red' : 'silver'} className={styles['paperclip']}
        onMouseEnter={onHoverHandler} onMouseLeave={onHoverHandler}/> 
        <TextArea className={styles['text-area']} placeholder='Введите сообщение...' 
            ref={textRef} onChange={onChangeHandler} onKeyDown={handleKeyPress}/> 
        <Send size={38} color={isActive ? 'red' : 'silver'} onClick={onClickHandler}
            className={isActive ? styles['send-horizontal'] : styles['send']}/>
    </div>
  )
}