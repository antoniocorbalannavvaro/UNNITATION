'use client'
import UniButton from "../../(components)/UniButton";
import UniCard from "../../(components)/UniCard";

export default function Page(){
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
                    <UniCard>Happyness</UniCard>
                </div>
            </div>
        </div>
    )
}