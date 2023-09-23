'use client'

import React, { HTMLProps, useEffect, useRef, useState } from 'react' 
import styles from './chatFoote.module.scss'
import { Input } from '../ui/input'
import { Paperclip, Send } from 'lucide-react'

export default function ChatFooter(props: HTMLProps<HTMLDivElement>) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isHover, setIsHover] = useState<boolean>(false);
    const textRef = useRef<HTMLInputElement>(null);

    const onChangeHandler = () => {
        setIsActive(textRef.current?.value !== '');
    } 
    const onHoverHandler = () => {
        setIsHover(!isHover);
    }
    const onClickHandler = () => {
        if (textRef.current?.value === '') return;

        
    }

    return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
        <Paperclip size={38} color={isHover ? 'red' : 'silver'} className={styles['paperclip']}
        onMouseEnter={onHoverHandler} onMouseLeave={onHoverHandler}/> 
        <Input className={styles['input']} placeholder='Введите сообщение...' 
            ref={textRef} onChange={onChangeHandler}/> 
        <Send size={38} color={isActive ? 'red' : 'silver'} onClick={onClickHandler}
            className={isActive ? styles['send-horizontal'] : styles['send']}/>
    </div>
  )
}