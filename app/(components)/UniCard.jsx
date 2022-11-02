import styles from './UniCard.module.css'

export default function UniCard(props){
    return(<div className={styles.card}>{props.children}</div>)
}