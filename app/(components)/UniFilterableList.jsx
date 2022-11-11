import UniSelectField from "./UniSelectField"
import Link from 'next/link'
import UniCard from "./UniCard"
import UniLabeledPair from "./UniLabeledPair"

export default function UniFilterableList(props) {

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
                                props.items.map(el => {
                                    return (
                                        <UniCard>
                                            <h2>{ el.name }</h2>
                                            {
                                                el.properties.map((il) => <UniLabeledPair label={il.label}>{il.value}</UniLabeledPair>)
                                            }
                                        </UniCard>
                                    )
                                })
                            }
                        
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <UniSelectField options={['Zoom','WhereBy','Meet','Other']}>Platform</UniSelectField>
                    <UniSelectField options={['English','Spanish','German']}>Language</UniSelectField>
                </div>
            </div>     
        </div>
    )

}