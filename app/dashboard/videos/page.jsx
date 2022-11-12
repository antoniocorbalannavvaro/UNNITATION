'use client'

import { useState, useEffect } from 'react'

import UniButton from "../../(components)/UniButton";
import UniCard from '../../(components)/UniCard'
import UniLabeledPair from "../../(components)/UniLabeledPair";
import UniSelectField from "../../(components)/UniSelectField";
import UniFilterableList from '../../(components)/UniFilterableList';

import { useUser } from '../../auth';

export default function Page(){
    
    const something = useUser({});
    
    const [items,setItems] = useState([]);
    const [meta, setMeta] = useState([])

    useEffect(() => {

        setItems([{
            name: '136D1D1D1DG.mp4',
            properties: [{
                id: 'text12',
                value: 'English'
            },{
                id: 'duration',
                value: '24m 32s',
            },{
                id: 'videodate',
                value: '20/10/2022'
            },{
                id: 'select125'
            }]
        }]);

        setMeta([{
            text12: {
                type: 'text',
                label: 'Language'
            },
            duration: {
                type: 'number',
                label: 'Duration'
            },
            videodate: {
                type: 'datetime',
                label: 'Date'
            }
        }])

    },[])
                                
    const button = <UniButton href="http://localhost:3000/dashboard/videos/upload" negative={true}>Upload Video</UniButton> ;

    return (
        <UniFilterableList title={'Videos'} action={button} items={items} ></UniFilterableList>
    )
}