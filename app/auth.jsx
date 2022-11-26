'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useUser = (props) => {

    const router = useRouter()
    const [user, setUser] = useState({})

    fetch('/api/get-auth-info/').then(res => res.json()).then(data => {
        return true;
        //if (data.error) router.replace('/login'); return;
    })

}

export { useUser }