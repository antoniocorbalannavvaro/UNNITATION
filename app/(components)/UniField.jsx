import React from 'react'

export default function UniField(props) {
 
    if ( props.type == 'submit' ) {
        return <input className="form-control btn gradient-background my-3" type={props.type} value={props.label} />
    }

    if (props.type == 'select') {
        return (
            <React.Fragment>
                <label className="mt-2">{props.label}</label>
                
                <select className="form-control my-1" onChange={(e) => props.handleChange(e.target.value)}>
                    {
                        props.config.options.map(el => {
                            return <option value={el}>{el}</option>
                        })
                    }
                </select>
            </React.Fragment>
            
            
        )
    }

    return (
        <React.Fragment>
            <label className="mt-1">{props.label}</label>
            <input className="form-control my-1" type={props.type} value={props.value} onChange={(e) => props.handleChange(e.target.value)} />
        </React.Fragment>
        
    )
}