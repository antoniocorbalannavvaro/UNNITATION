import styles from './UniButton.module.css'

export default function UniButton(props) {
    return (
        <button className={styles.button}>{props.children}</button>
    );
}