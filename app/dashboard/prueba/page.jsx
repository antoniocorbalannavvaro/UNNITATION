'use client'
import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import { Rating } from 'react-simple-star-rating'
import 'reactjs-popup/dist/index.css';
import './style.css';

const popUpStyle = {
    backgroundColor: 'aliceblue',
    width: '600px', 
    height: '300px',
    borderRadius: '10px',
    boxShadow: '2px 2px #d2d2d2'
}
export function UniRating() {

    let userRate;
    
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState(false);

    const changeMessage = () => {
        setMessage(true)
    }

    const handleRating = (rate) => {
        userRate = rate;
        console.log(userRate,'userRate')
        setRating(rate)
        changeMessage()
    }

    return (
        <div>
            <h1>Rate the deal possibillity</h1>
            <h1>
                <Rating onClick={handleRating}/>
                {message ? <h3 style={{color:'green'}}>Thanks for rating. Fuck you 😊</h3> : null}
            </h1>
           
        </div>
    )
}

const PopUpRating = () => {

    const [popUpState, setPopUpState] = useState(false)

    const showPopUp = () => {
        setPopUpState(!popUpState);
    }

    return (
        <div >
            <button onClick={() => {showPopUp()}}>Open</button>

            <Popup contentStyle={popUpStyle} open={popUpState}>
            {popUpState 
                    ? <UniRating></UniRating>
                    : null}
                
            </Popup>



        </div>
    );
}

export default PopUpRating;
