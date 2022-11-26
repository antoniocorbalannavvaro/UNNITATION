'use client'
import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './style.css'
const UniStar = () => {
    const on = '★';
    const off = '☆';

    return (
        <button >{on}</button>
    );
}

const UniStars = () => {
    return (
        <UniStar></UniStar>
    );
}

const Page = () => {

    const [popUpState, setPopUpState] = useState(false)

    const showPopUp = () => {
        setPopUpState(!popUpState);
    }

    return (
        <div>
            <button onClick={() => {showPopUp()}}>Open</button>
            <Popup open={popUpState}>
           
            {popUpState 
                    ? <UniStars></UniStars>
                    : null}
                
            </Popup>
        </div>
    );
}

export default Page;
