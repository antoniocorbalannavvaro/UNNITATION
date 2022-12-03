'use client'

import React, {useState} from 'react'
import EmojiPicker from 'emoji-picker-react';
import UniCard from './UniCard';
import UniSelectField from './UniSelectField';


export default function UniField(props) {    

    const handle = (e) => {
        if (e.emoji) {
            setShowPicker(false)
            props.handleChange(e.emoji, props.id);
            return;
        }
        props.handleChange(e.target.value, props.id)
    }

    
 
    if ( props.type == 'submit' ) {
        return <input className="form-control btn gradient-background my-3" type={props.type} value={props.label} />
    }

    if (props.type == 'select') {

            
    }

    if (props.type == 'emoji') {

        const [showPicker, setShowPicker] = useState(false)

        return (
            <React.Fragment>   
                <label>{props.label}</label>
                <button onClick={(e) => { e.preventDefault() ; setShowPicker(true)}}>{ props.value == '' ? 'Select emoji' : props.value }</button>             
                { showPicker ? <EmojiPicker onEmojiClick={handle}/> : null }
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