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
                        <div className="col"><h1>Videos</h1></div>
                        <div className="col d-flex justify-content-end">
                            <a href="/dashboard/videos/upload">
                                <UniButton negative={true}>Upload Video</UniButton>
                            </a>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-12">
                        <UniCard>
                            <h2>136D1D1D1DG.mp4</h2>
                            <UniLabeledPair label="Language">English</UniLabeledPair>
                            <UniLabeledPair label="Platform">Zoom</UniLabeledPair>
                            <UniLabeledPair label="Duration">24m 32s</UniLabeledPair>
                            <UniLabeledPair label="Date">20/10/2022</UniLabeledPair>
                            <UniLabeledPair label="Platform">Zoom</UniLabeledPair>
                            <UniLabeledPair label="Agents">5</UniLabeledPair>
                        </UniCard>
                        <UniCard>
                            <h2>136D1D1D1DG.mp4</h2>
                            <UniLabeledPair label="Language">English</UniLabeledPair>
                            <UniLabeledPair label="Platform">Zoom</UniLabeledPair>
                            <UniLabeledPair label="Duration">24m 32s</UniLabeledPair>
                            <UniLabeledPair label="Date">20/10/2022</UniLabeledPair>
                            <UniLabeledPair label="Platform">Zoom</UniLabeledPair>
                        </UniCard>
                        <UniCard>
                            <h2>136D1D1D1DG.mp4</h2>
                            <UniLabeledPair label="Language">English</UniLabeledPair>
                            <UniLabeledPair label="Platform">Zoom</UniLabeledPair>
                            <UniLabeledPair label="Duration">24m 32s</UniLabeledPair>
                            <UniLabeledPair label="Date">20/10/2022</UniLabeledPair>
                            <UniLabeledPair label="Platform">Zoom</UniLabeledPair>
                        </UniCard>
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