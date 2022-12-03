'use client'

import { useContext, useEffect, useImperativeHandle, useState } from 'react'
import { useUser } from '../auth'
import GlobalContext from "../GlobalContext"

export default function RootLayout({ children }) {

    useUser()

    const [meta, setMeta] = useState()

    useEffect(() => {
      
      fetch('/api/meta').then((res) => {
        return res.json()
      }).then((data) => {
          console.log(data)
          if (data.error) {
              return;
          }; 

          setMeta(data)

      })
    },[])

  return (
    <GlobalContext.Provider value={{ meta: meta }}>
        {children}
    </GlobalContext.Provider>  
  )
}
