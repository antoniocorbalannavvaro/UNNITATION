import styles from './UniButton.module.css'

export default function UniButton(props) {
    return (
        <button style={styles.button}>{props.children}</button>
    );
}