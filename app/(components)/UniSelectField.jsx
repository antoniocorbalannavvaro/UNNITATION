import styles from './UniSelectField.module.css'

export default function UniSelectField(props){
    return (
        <div className={styles.selectContainer}>
            <label className={styles.label}>{props.children}</label>
            <select className="form-select">
                { props.options ? props.options.map((i,key) => <option key={key} value={i}>{i}</option>) : null }
            </select>
        </div>
    )
}