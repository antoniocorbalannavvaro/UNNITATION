'use client'
import { useEffect, useState } from "react";
import UniButton from "../../(components)/UniButton";
import UniCard from "../../(components)/UniCard";

export default function Page(){

    const [labels,setLabels] = useState([])

    useEffect(() => {
        fetch('/api/label/list').then(
            r => r.json()
        ).then(d => {
            setLabels(d)
        })
    },[])

    return(
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-6">
                    <div className="row mb-3">
                        <div className="col">
                            <h1>Labels</h1>   
                        </div>
                        <div className="col d-flex justify-content-end">
                            <a href="/dashboard/labels/new-label"><UniButton negative={true}>New Label Pair</UniButton></a>
                        </div>
                    </div>
                    {
                        labels.length > 0 ? 
                            labels.map(
                                l => <UniCard>
                                        <div className="row">
                                            <span className="d-inline w-auto">{l.emojiUnicode}</span>
                                            <span className="d-inline w-auto">{l.name}</span>
                                        </div>
                                    </UniCard>
                            )
                            : <UniCard>Please, create your first label and it will appear here</UniCard>
                    }
                    
                </div>
            </div>
        </div>
    )
}