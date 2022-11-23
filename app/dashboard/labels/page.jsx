'use client'
import UniButton from "../../(components)/UniButton";
import UniCard from "../../(components)/UniCard";
import getData from "./fetch.enum.module";

const labels = await getData('labels');
console.log('getLabelsgetLabelsgetLabelsgetLabels' , labels);

const showLabels = () => {

    return Object.entries(labels).map((i) => {console.log(i); return <UniCard>{i[0]} {i[1]}</UniCard>})
}

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
                    {showLabels()}
                </div>
            </div>
        </div>
    )
}