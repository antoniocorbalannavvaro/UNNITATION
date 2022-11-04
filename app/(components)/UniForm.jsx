import UniField from "./UniField"

function UniForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>

               {
                props.fields.map((el) => {
                    return  <UniField 
                                type={el.type} 
                                label={el.label} 
                                value={el.value} 
                                handleChange={el.handleChange}>
                            </UniField>
                })
               }
            
      </form>
    )
}

function formatField(type,label,value,setter){
    return {
        type:type,
        label:label,
        value:value,
        handleChange:setter
    }
}



export { UniForm, formatField }