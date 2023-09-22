'use client'

import { HTMLProps } from 'react'
import styles from './page.module.scss'
import ChatHeader from '@/components/chatHeader/chatHeader'

export default function Home(props: HTMLProps<HTMLDivElement>) {
  return (
    <main className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <ChatHeader/>

      <div className={styles['chat']}>

      </div>

      <div className={styles['footer']}>

      </div>
    </main>
  )
}
