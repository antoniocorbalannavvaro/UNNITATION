'use client'

import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = React.createContext({})

const useUser = (props) => {

    const [user, setUser] = useState({})

    const router = useRouter()

    if (props.prueba) {
        router.push('/login')
    }

    return true;
}

export { useUser }
export default AuthContext