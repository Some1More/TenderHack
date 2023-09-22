'use client'

import React, { HTMLProps, useEffect, useRef, useState } from 'react' 
import styles from './chatFoote.module.scss'
import { Input } from '../ui/input'
import { Paperclip, Send, SendHorizontal } from 'lucide-react'

export default function ChatFooter(props: HTMLProps<HTMLDivElement>) {
    const [first, setfirst] = useState<number>(0)
    const textRef = useRef(null)
    
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
        <Paperclip size={38} color='silver' className={styles['paperclip']}/>
        <Input className={styles['input']} placeholder='Введите сообщение...'/>
        {}
        <Send size={38} color='silver' className={styles['send-horizontal']}/>
    </div>
  )
}