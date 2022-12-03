import styles from './UniCard.module.css'

export default function UniCard(props){
    return(<div style={props.style} className={styles.card}>{props.children}</div>)
}