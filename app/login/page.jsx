'use client'
import { useState} from 'react'
import { useRouter } from 'next/navigation'
import { formatField, UniForm} from '../(components)/UniForm';

export default function Page() {

    const router = useRouter()

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [madre,setMadre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/dashboard')   
    }

    return (
        <UniForm 
            fields={[
                    formatField('email','Email Address',email,setEmail),
                    formatField('text','Tu puta madre',madre,setMadre),
                    formatField('password','Your password',password,setPassword),
                    formatField('submit','LOG IN'),
            ]}
            handleSubmit={handleSubmit}>
        </UniForm>
    )
}