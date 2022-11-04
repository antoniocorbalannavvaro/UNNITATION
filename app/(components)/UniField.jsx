export default function UniField(props) {
 
    if ( props.type == 'submit' ) {
        console.log('SUBMIT')
        return <input type={props.type} value={props.label} />
    }

    return (
        <label>
            {props.label}
                <input type={props.type} value={props.value} onChange={(e) => props.handleChange(e.target.value)} />
        
        </label>
    )
}
/*
"button"
"checkbox"
"color"
"date"
"datetime-local"
"email"
"file"
"hidden"
"image"
"month"
"number"
"password"
"radio"
"range"
"reset"
"search"
"submit"
"tel"
"text"
"time"
"url"
"week"*/