'use client'

import { useState, useEffect } from 'react'

import UniButton from "../../(components)/UniButton";
import UniCard from '../../(components)/UniCard'
import UniLabeledPair from "../../(components)/UniLabeledPair";
import UniSelectField from "../../(components)/UniSelectField";
import UniFilterableList from '../../(components)/UniFilterableList';

export default function Page(){
    
    const [items,setItems] = useState([]);
    const [meta, setMeta] = useState([])

    useEffect(() => {

        setItems([{
            name: '136D1D1D1DG.mp4',
            properties: [{
                label: 'Language',
                value: 'English',
                type: 'text'
            },{
                label: 'Duration',
                value: '24m 32s',
                type: 'text'
            },{
                label: 'Date',
                value: '20/10/2022',
                type: 'date'
            }]
        }]);

        setMeta({})

    },[])
                                
    const button = <UniButton href="http://localhost:3000/dashboard/videos/upload" negative={true}>Upload Video</UniButton> ;

    return (
        <UniFilterableList title={'Videos'} action={button} items={items} ></UniFilterableList>
    )
}