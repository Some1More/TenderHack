import React, { HTMLProps } from 'react' 
import styles from './chatHistory.module.scss'

export default function ChatHistory(props: HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
        
    </div>
  )
}