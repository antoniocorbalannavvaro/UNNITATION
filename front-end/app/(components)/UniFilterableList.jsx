import UniCard from "./UniCard"
import UniLabeledPair from "./UniLabeledPair"
import { useContext, useState, useEffect } from "react"
import { formatField, UniForm } from "./UniForm"
import GlobalContext from "../GlobalContext"


export default function UniFilterableList(props) {

    const meta = useContext(GlobalContext).meta

    const [items,setItems] = useState([]);
    const [metaFields,setMetaFields] = useState([]);
    const [error, setError] = useState([])

    var filters = []
    var data = {} 

    useEffect(() => {

        fetch(props.apiRoute).then((res) => res.json()).then((data) => {

            if (data.error) {
                setError(data.reason)
                return;
            }; 

            console.log(data)

            setItems(data);
            setMetaFields(Object.keys(data[0]))

        })

    },[])

    const handleChange = (d, key) => data[key] = d

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(props.apiRoute + '?' + new URLSearchParams(data)).then((res) => res.json()).then((data) => {
            if (data.error) {
                setError(data.reason)
                return;
            };

            console.log(data)
        })
    }

    for (const key in meta) {
        if (Object.hasOwnProperty.call(meta, key) && metaFields.indexOf(key) > -1) {

            const config = {
                options: meta[key].options ? meta[key].options : null,
                multiple: true
            } 

            filters.push(
                formatField(
                    meta[key].type, 
                    meta[key].label, 
                    data[key],
                    handleChange, 
                    config, 
                    key
                )
            )
        }
    }

    filters.push(formatField('submit','Filtrar',null, handleSubmit))

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-8">
                    <div className="row">
                        <div className="col"><h1>{props.title}</h1></div>
                        <div className="col d-flex justify-content-end">
                            {props.action}
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-12">
                            {
                                items ? 
                                items.map((el, i) => {
                                    return (
                                        <UniCard key={i}>
                                            <h2>{ el.name }</h2>
                                            {
                                                Object.keys(el).map((p,ji) => {
                                                    if (p == 'name') return;
                                                    return <UniLabeledPair key={ji} label={meta[p] ? meta[p].label : '' }>{el[p]}</UniLabeledPair>
                                                })
                                            }
                                        </UniCard>
                                    )
                                }) : null
                            }
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <UniForm 
                        fields={filters}
                        handleSubmit={handleSubmit}>
                    </UniForm>
                </div>
            </div>     
        </div>
    )

}