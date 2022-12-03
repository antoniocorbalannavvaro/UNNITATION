
import Link from 'next/link'
import styles from './UniButton.module.css'

export default function UniButton(props) {

    const button = <button className={styles.button + ' ' + (props.negative ? styles.negative : '')}>{props.children}</button>

    if (props.href) {
        return (
            <Link href={props.href}>
                { button }
            </Link>
        )
    }

    return button
 
}