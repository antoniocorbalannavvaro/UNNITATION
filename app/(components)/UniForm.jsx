import UniField from "./UniField"
import styles from './UniForm.module.css'

function UniForm(props) {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
               {
                props.fields.map((el, i) => {
                   
                    if (!el.config.conditionalShow) {
                        return null;
                    }

                    return  <UniField 
                                key={i}
                                type={el.type} 
                                label={el.label} 
                                value={el.value} 
                                handleChange={el.handleChange}
                                config={el.config && el.config}>
                            </UniField>
                })
               }
            </div>
      </form>
    )
}

function formatField(type,label,value,setter,config){
    return {
        type: type,
        label: label,
        value: value,
        handleChange: setter,
        config: {conditionalShow: true, ...config}
    }
}



export { UniForm, formatField }