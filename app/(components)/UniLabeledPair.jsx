import styles from './UniLabeledPair.module.css';

export default function UniLabeledPair(props){
    return(
        <div className={styles.labeledPair}>
            { props.label? (<h3 className={styles.label}>{props.label}</h3>) : '' }
            <p className={styles.content}>{props.children}</p>
        </div>
    )
}