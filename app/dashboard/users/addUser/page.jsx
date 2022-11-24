'use client'

import {useState} from 'react';
import UniCard from '../../../(components)/UniCard';
import { formatField, UniForm } from '../../../(components)/UniForm';

const Page = () => {

    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // se envia al backend
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-6 mt-5">
                    <UniCard>
                        <h1>Add User</h1>
                        <UniForm 
                            fields={[
                                formatField('text','Email', email, setEmail ),
                                formatField('select','Role', role, setRole, { options: ['Maquinón','Pantera'] } ),
                                formatField('submit','Submit', null, null )
                            ]}
                            handleSubmit={handleSubmit}/>
                    </UniCard>
                </div>
            </div>
        </div>
        
        
    )
}


export default Page;