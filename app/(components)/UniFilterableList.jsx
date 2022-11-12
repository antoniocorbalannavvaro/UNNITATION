import UniCard from "./UniCard"
import UniLabeledPair from "./UniLabeledPair"
import { useContext, useState, useEffect } from "react"
import AuthContext from "../auth"
import { formatField, UniForm } from "./UniForm"

export default function UniFilterableList(props) {

    const meta = useContext(AuthContext).meta

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

            setItems(data);
            setMetaFields(data[0].properties.map((i) => i.id))

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
                options: meta[key].options ? meta[key].options : null
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
                                                el.properties.map((p,ji) => {

                                                    return <UniLabeledPair key={ji} label={meta[p.id] ? meta[p.id].label : '' }>{p.value}</UniLabeledPair>
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