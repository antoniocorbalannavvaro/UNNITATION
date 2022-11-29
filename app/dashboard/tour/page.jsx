'use client'

import React, {useState} from 'react';
import './style.css';

const videoText = '';
const labelText = '';
const individualLabelText = '';
const deelText = '';

const videoTextPosition = {top:'185px', left:'20px',width:'600px', height:'405px'};
const labelTextPosition = {top:'150px', left:'600px',width:'600px', width:'600px', height:'350px'};
const individualLabelTextPosition = {top:'256px', left:'600px', width:'580px', height:'80px'};
const deelTextPosition = {top:'342px', left:'600px', width:'580px', height:'80px'};

const TEXTS = [videoText, labelText, individualLabelText, deelText];
const POSITIONS = [videoTextPosition, labelTextPosition, individualLabelTextPosition, deelTextPosition];

const UniWizard = () => {

    let [textIndex, setIndex] = useState(0);
    let [positionIndex, setPositionIndex] = useState(0);

    const [infoState, setInfoState] = useState(true);

    const closeInfo = () => {
        setInfoState(!infoState)
    }

    const nextAction = () => {

        if((textIndex >=0) && (textIndex <= (TEXTS.length -2))){
            setIndex(textIndex += 1);
            setPositionIndex(positionIndex += 1);

            return
        }

        else return
    }

    const backAction = () => {

        if((textIndex >=1) && (textIndex <= (TEXTS.length -1))){
            setIndex(textIndex -= 1);
            setPositionIndex(positionIndex -= 1);
            return
        }

        else return
    }

    return (
        <div>
            {infoState
            ?
            <div>
                <div className='tour-card' style={POSITIONS[positionIndex]}>
                    <div>
                        <button onClick={() => {closeInfo()}} className='close-button'>
                            <img src="https://cdn3.emoji.gg/emojis/9636_Cross.png"
                            alt=""
                            width='20'
                            height='20'
                            />
                        </button>
                    </div>

                    <p>{TEXTS[textIndex]}</p>
                </div>

                    <div className='button-container'>
                        <button onClick={() => {backAction()}} className='back-button'>⬅ Back</button>
                        <button onClick={() => {nextAction()}} className='next-button'>Next ➡</button>
                    </div>
            </div>

            : 
            null
            }


 

        </div>
    );
}

const Page = () => {

    const [infoState, setInfoState] = useState(false);

    const showInfo = () => {
        setInfoState(!infoState);
    }

    const ButtonInfo = () => {

        return (
            <div>
                <button onClick={() => {showInfo()}} className='question'>
                    <img src="https://cdn-icons-png.flaticon.com/512/71/71768.png" alt="img not found"
                    width="80" height="80"/>
                </button>
            </div>
        );
    }

    return (
        <div>
            <ButtonInfo></ButtonInfo>
            {infoState
                ? <UniWizard></UniWizard>
                : null}
            
        </div>
    );
}

export default Page;