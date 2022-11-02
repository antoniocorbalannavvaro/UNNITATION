import styles from './UniLabelsControl.module.css';

export default function UniLabelsControl(props) {

    return (
        <div>
            <div onClick={() => props.clickHandler(props.label[0])} className={styles.label}>{props.label[0]}</div>
            <div onClick={() => props.clickHandler(props.label[1])} className={styles.label}>{props.label[1]}</div>
        </div>
    )
}