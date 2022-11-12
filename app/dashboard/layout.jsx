'use client'

import { useEffect } from 'react'
import AuthContext from '../auth'

export default function RootLayout({ children }) {

    useEffect(() => {
        
        fetch('/api/get-meta-fields').then((res) => {
            return res.json()
        }).then((data) => {

            if (data.error) {
                setError(data.reason)
                return;
            }; 

            console.log(data);

        })

    }, [])

  return (
    <AuthContext.Provider value={{msg: 'Funciona'}}>
        {children}
    </AuthContext.Provider>
      
  )
}
