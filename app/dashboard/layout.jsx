'use client'

import { useEffect, useState } from 'react'
import AuthContext from '../auth'

export default function RootLayout({ children }) {

    const [meta, setMeta] = useState({})

    useEffect(() => {
        
        fetch('/api/get-meta-fields').then((res) => {
            return res.json()
        }).then((data) => {

            if (data.error) {
                setError(data.reason)
                return;
            }; 

            setMeta(data)

        })

    }, [])

  return (
    <AuthContext.Provider value={{meta: meta}}>
        {children}
    </AuthContext.Provider>
      
  )
}
