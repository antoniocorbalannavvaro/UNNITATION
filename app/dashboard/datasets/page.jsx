import UniButton from "../../(components)/UniButton";
import UniCard from '../../(components)/UniCard'
import UniLabeledPair from "../../(components)/UniLabeledPair";
import UniSelectField from "../../(components)/UniSelectField";

export default function Page(){
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-8">

                    <div className="row">
                        <div className="col"><h1>Datasets</h1></div>
                        <div className="col d-flex justify-content-end">
                            <a href="/dashboard/videos/upload">
                                <UniButton negative={true}>New Dataset</UniButton>
                            </a>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-12">
                        <UniCard>
                            <h2>Zoom Videos in English</h2>
                            <UniLabeledPair label="Annotated">60%</UniLabeledPair>
                            <UniLabeledPair label="Nº Videos">35</UniLabeledPair>
                            <UniLabeledPair label="Nº Users">236</UniLabeledPair>
                            <UniLabeledPair label="IA">57%</UniLabeledPair>
                        </UniCard>
                        <UniCard>
                            <h2>Zoom Videos in English</h2>
                            <UniLabeledPair label="Annotated">60%</UniLabeledPair>
                            <UniLabeledPair label="Nº Videos">35</UniLabeledPair>
                            <UniLabeledPair label="Nº Users">236</UniLabeledPair>
                            <UniLabeledPair label="IA">57%</UniLabeledPair>
                        </UniCard>
                        <UniCard>
                            <h2>Zoom Videos in English</h2>
                            <UniLabeledPair label="Annotated">60%</UniLabeledPair>
                            <UniLabeledPair label="Nº Videos">35</UniLabeledPair>
                            <UniLabeledPair label="Nº Users">236</UniLabeledPair>
                            <UniLabeledPair label="IA">57%</UniLabeledPair>
                        </UniCard>
                        <UniCard>
                            <h2>Zoom Videos in English</h2>
                            <UniLabeledPair label="Annotated">60%</UniLabeledPair>
                            <UniLabeledPair label="Nº Videos">35</UniLabeledPair>
                            <UniLabeledPair label="Nº Users">236</UniLabeledPair>
                            <UniLabeledPair label="IA">57%</UniLabeledPair>
                        </UniCard>
                        

                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <UniSelectField options={['Happy','Sad','Deal','Deal Rejected']}>Labels</UniSelectField>
                    <UniSelectField options={['English','Spanish','German']}>Language</UniSelectField>
                </div>
            </div>     
        </div>
    )
}