'use client'

import {useState, useContext} from 'react';
import GlobalContext from '../../../GlobalContext';
import UniCard from '../../../(components)/UniCard';
import { formatField, UniForm } from '../../../(components)/UniForm';

const Page = () => {

    const meta = useContext(GlobalContext)

    const [email, setEmail] = useState('')
    const [roles, setRoles] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        // se envia al backend
        fetch('/api/user/invite?' + new URLSearchParams({
            email: email,
            roles: roles
        })).then((res) => {
            return res.json()
        }).then((data) => {

            if (data.error) {
                console.log(data)
                return;
            };

            router.push('/dashboard/videos');
        })
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
                                formatField('select','Role', roles, setRoles, { options: ['Maquinón','Pantera'] } ),
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