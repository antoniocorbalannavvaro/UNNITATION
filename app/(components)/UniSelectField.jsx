import styles from './UniSelectField.module.css'

export default function UniSelectField(props){

    const [selectedItems, setSelectedItems] = useState([])


    const handleSelect = (e) => {
        if (props.config.multiple) { setSelectedItems([...selectedItems, e.target.value]); return; }
        handle(e)
    }

    return (
        <React.Fragment>
            <label className="mt-2">{props.label}</label>
            
            { 
                typeof selectedItems !== 'undefined' ? 
                selectedItems.map((si) => (
                    <UniCard style={{padding: 10, fontSize: 12, width: 'auto', display: 'inline-block', margin: 5}}>
                        <div>{si}</div>
                    </UniCard>
                )) : null
            }
            
            <select className="form-control my-1" onChange={handleSelect}>
                {
                    props.config.options.map((el,i) => {
                        return <option key={i} value={el}>{el}</option>
                    })
                }
            </select>
        </React.Fragment>
        
    )
}