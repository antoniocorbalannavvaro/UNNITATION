import styles from './UniMenu.module.css'

export default function UniMenu(){
    return(
        <ul className={styles.list}>
            <a href="/dashboard/videos"><li>Videos</li></a>
            <a href="/dashboard/datasets"><li>Datasets</li></a>
            <a href="/dashboard/labels"><li>Labels</li></a>
            <a href="/dashboard/experiments"><li>Experiments</li></a>
            <a href="/dashboard/users"><li>Users</li></a>
        </ul>
    )
}