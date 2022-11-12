'use client'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { formatField, UniForm} from '../(components)/UniForm';
import UniCard from '../(components)/UniCard';

export default function Page() {

    const router = useRouter()

    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [password,setPassword] = useState('');
    const [prueba,setPrueba] = useState('No')

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/login?' + new URLSearchParams({
            username: email,
            password: password,
        })).then((res) => {
            return res.json()
        }).then((data) => {

            if (data.error) {
                setError(data.reason)
                return;
            };

            router.push('/dashboard/videos')   

        })

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
                                formatField('password','Your password',password,setPassword),
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