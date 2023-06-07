import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface ListItemProps {
    icon: ReactNode,
    text: string
}

export default function ListItem(props: ListItemProps) {
    return (
        <li className={styles.listItem}>
            <div>
                {props.icon}
            </div>
            
            <span>
                {props.text}
            </span>
        </li>
    )
}