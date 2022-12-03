'use client'

import UniButton from "../../(components)/UniButton";
import UniFilterableList from '../../(components)/UniFilterableList';


export default function Page(){
                                
    const button = <UniButton href="http://localhost:3000/dashboard/videos/upload" negative={true}>Upload Video</UniButton> ;

    return (
        <UniFilterableList title={'Videos'} action={button} apiRoute={'/api/video/list/'}></UniFilterableList>
    )
}