'use client'
import React, {useState} from 'react';
import './style.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

let UserData = {
    email: 'antoniocn1996@gmail.com',
    name: 'Antonio Corbalán Navarro',
    role: ['Annotator'],
    department: 'Marketing',
    languages: ['Spanish', 'English']
}

const showLanguages = () => {
    return UserData.languages.map((i) => {return <li>{i}</li>})
}

const PopUp = (imgState) => (
    <Popup open={imgState} position="bottom center">
        <div>
            <p>{UserData.email}</p>
            <p>{UserData.name}</p>
            <p>{UserData.role}</p>
            <p>{UserData.department}</p>
            <p>Languages:</p>
            <ul>
                {showLanguages()}
            </ul>
        </div>
    </Popup>
);

function UserAvatar() {

    const [imgState, setImgState] = useState(false);

    const changeImgState = () => {
        setImgState(!imgState);
    }

    return (
        <div>
            <button className='buttonAvatar'>
                <img onClick={() => changeImgState()} className='avatar' src="http://www.smartpowerdrink.com/pub/skin/default-skin/img/avatar.png"/> 
            </button>
            {imgState ? <PopUp/> : null}
        </div>

      
  );
}

export default UserAvatar;