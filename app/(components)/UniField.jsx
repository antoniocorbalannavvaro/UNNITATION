import React from 'react'

export default function UniField(props) {

    const handle = (e) => {
        props.handleChange(e.target.value, props.id)
    }
 
    if ( props.type == 'submit' ) {
        return <input className="form-control btn gradient-background my-3" type={props.type} value={props.label} />
    }

    if (props.type == 'select') {
        return (
            <React.Fragment>
                <label className="mt-2">{props.label}</label>
                
                <select className="form-control my-1" onChange={handle}>
                    {
                        props.config.options.map((el,i) => {
                            return <option key={i} value={el}>{el}</option>
                        })
                    }
                </select>
            </React.Fragment>
            
            
        )
    }

    return (
        <React.Fragment>
            <label className="mt-1">{props.label}</label>
            <input className="form-control my-1" type={props.type} value={props.value} onChange={handle} />
        </React.Fragment>
        
    )
}