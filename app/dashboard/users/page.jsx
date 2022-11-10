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
                        <div className="col"><h1>Users</h1></div>
                        <div className="col d-flex justify-content-end">
                            <a href="/dashboard/users/newUser">
                                <UniButton negative={true}>Add User</UniButton>
                            </a>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-12">
                        <UniCard>
                            <h2>Alejandro Escribano García</h2>
                            <UniLabeledPair label="Email">alejandro@unnitation.com</UniLabeledPair>
                            <UniLabeledPair label="Company">Uniphore</UniLabeledPair>
                            <UniLabeledPair label="Role/s">Annotator</UniLabeledPair>
                            <UniLabeledPair label="1st language">Spanish</UniLabeledPair>
                            <UniLabeledPair label="Age">27</UniLabeledPair>
                            <UniLabeledPair label="IA">67%</UniLabeledPair>
                        </UniCard>
                        <UniCard>
                            <h2>Alejandro Escribano García</h2>
                            <UniLabeledPair label="Email">alejandro@unnitation.com</UniLabeledPair>
                            <UniLabeledPair label="Company">Uniphore</UniLabeledPair>
                            <UniLabeledPair label="Role/s">Annotator</UniLabeledPair>
                            <UniLabeledPair label="1st language">Spanish</UniLabeledPair>
                            <UniLabeledPair label="Age">27</UniLabeledPair>
                            <UniLabeledPair label="IA">67%</UniLabeledPair>
                        </UniCard>
                        <UniCard>
                            <h2>Alejandro Escribano García</h2>
                            <UniLabeledPair label="Email">alejandro@unnitation.com</UniLabeledPair>
                            <UniLabeledPair label="Company">Uniphore</UniLabeledPair>
                            <UniLabeledPair label="Role/s">Annotator</UniLabeledPair>
                            <UniLabeledPair label="1st language">Spanish</UniLabeledPair>
                            <UniLabeledPair label="Age">27</UniLabeledPair>
                            <UniLabeledPair label="IA">67%</UniLabeledPair>
                        </UniCard>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <UniSelectField options={['Marketing','DS','Sales','Other']}>Department</UniSelectField>
                    <UniSelectField options={['English','Spanish','German']}>Language</UniSelectField>
                </div>
            </div>     
        </div>
    )
}