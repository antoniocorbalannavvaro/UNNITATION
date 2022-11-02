import styles from './UniButton.module.css'

export default function UniButton(props) {
    return (
        <button className={styles.button + ' ' + (props.negative ? styles.negative : '')}>{props.children}</button>
    );
}