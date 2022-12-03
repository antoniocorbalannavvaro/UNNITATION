'use client'

import { useContext, useEffect, useImperativeHandle, useState } from 'react'
import { useUser } from '../auth'
import getMeta from '../meta'
import GlobalContext from "../GlobalContext"


export default function RootLayout({ children }) {

    useUser()

    const [meta, setMeta] = useState()

    getMeta().then(d => setMeta(d))


  return (
    <GlobalContext.Provider value={{ meta: meta }}>
        {children}
    </GlobalContext.Provider>  
  )
}
