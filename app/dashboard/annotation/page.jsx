'use client'

import { useState, useRef } from 'react'

import UniLabelsControl from "../../(components)/UniLabelsControl";

import UniTutorial from '../wizard/tour-annotation/page';

export default function Page(){

    const ref = useRef(null);
    const [annotations, setAnnotations] = useState([]);

    const handleClick = (label) => {
        setAnnotations([{ label: label, time: ref.current.currentTime},...annotations ])
    }

    return(
        <div className="container">
            <div className="row py-5">
                <div className="col">
                    <video ref={ref} width="100%" height="400" controls>
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="col p-5">
                    <h2>Click if you notice...</h2>
                    <UniLabelsControl label={['Happy','Sad']} clickHandler={handleClick}></UniLabelsControl>
                    <UniLabelsControl label={['Deal','Deal Rejected']} clickHandler={handleClick}></UniLabelsControl>
                    {annotations.map(i => (
                        <div className="row">
                            <div className="col">
                                {i.label}:{i.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <UniTutorial></UniTutorial> 
        </div>
    )
}