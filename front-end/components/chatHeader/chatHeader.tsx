import React, { HTMLProps } from 'react'
import styles from './chatHeader.module.scss' 
import Image from 'next/image'
import GreenEllipse from '@/public/GreenEllipse.svg'
import { X } from 'lucide-react'

export default function ChatHeader(props: HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
        <div className={styles['flex-container']}>
            <div className={styles['img-wrapper']}>
                <Image className={styles['img']} src={GreenEllipse} alt='Online'/> 
            </div>
            <p className={styles['support-text']}>Поддержка</p>
            <X size={38} color='red'/>
        </div>
    </div>
  )
} 