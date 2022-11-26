'use client'

import { useEffect, useImperativeHandle, useState } from 'react'
import { useUser } from '../auth'
import getMeta from '../meta'
import GlobalContext from "../GlobalContext"


export default function RootLayout({ children }) {

    useUser()

  return (
    <GlobalContext.Provider value={{ meta: getMeta() }}>
        {children}
    </GlobalContext.Provider>  
  )
}
