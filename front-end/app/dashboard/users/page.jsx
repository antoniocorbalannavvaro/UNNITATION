'use client'
import UniButton from "../../(components)/UniButton";
import UniFilterableList from "../../(components)/UniFilterableList";

export default function Page(){

    const button = <UniButton href="/dashboard/user/addUser" negative={true}>New User</UniButton> ;

    return (
        <UniFilterableList title={'Users'} action={button} apiRoute={'/api/user/list/'}></UniFilterableList>
    )
}