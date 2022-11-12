import styles from './UniMenu.module.css'
import Link from 'next/link'

export default function UniMenu(){
    return(
        <ul className={styles.list}>
            <Link href="/dashboard/users"><li>Users</li></Link>
            <Link href="/dashboard/videos"><li>Videos</li></Link>
            <Link href="/dashboard/experiments"><li>Experiments</li></Link>
            <Link href="/dashboard/labels"><li>Labels</li></Link>
            <Link href="/dashboard/annotation"><li>Annotation</li></Link>
        </ul>
    )
}