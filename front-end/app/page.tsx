import { HTMLProps } from 'react'
import styles from './page.module.scss'
import ChatHeader from '@/components/chatHeader/chatHeader'
import ChatHistory from '@/components/chatHistory/chatHistory'
import ChatFooter from '@/components/chatFooter/chatFooter'

export default function Home(props: HTMLProps<HTMLDivElement>) {
  const [messages, setMessages] = useState([]);

  return (
    <main className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <ChatHeader/> 
      <ChatHistory/> 
      <ChatFooter/>
    </main>
  )
}
