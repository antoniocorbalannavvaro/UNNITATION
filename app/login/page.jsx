'use client'
import { useState} from 'react'
import { useRouter } from 'next/navigation'
import { formatField, UniForm} from '../(components)/UniForm';
import UniCard from '../(components)/UniCard';

export default function Page() {

    const router = useRouter()

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [prueba,setPrueba] = useState('No')

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/dashboard/videos')   
    }

    return (
        <div className="container" style={{marginTop:'100px'}}>
            <div className="row justify-content-center">
                <div className="col-4">
                <UniCard>
                    <h1>Log In</h1>
                    <UniForm 
                        fields={[
                                formatField('email','Email Address',email,setEmail),
                                formatField('select','Prueba',prueba,setPrueba,{options: ['Si','No']}),
                                formatField('password','Your password',password,setPassword, {conditionalShow: prueba == 'No'}),
                                formatField('submit','LOG IN'),
                        ]}
                        handleSubmit={handleSubmit}>
                    </UniForm>
                </UniCard>
                </div>
            </div>
        </div>
        
        
    )
}