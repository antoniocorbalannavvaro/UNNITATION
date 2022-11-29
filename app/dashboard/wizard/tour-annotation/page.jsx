'use client'

import React, {useState} from 'react';
import './style.css';

const videoText = 'This is the video you gonna annotate.';
const labelText = 'Label section';
const individualLabelText = 'Emotional label';
const dealText = 'Deal label';
const goodLuck = 'goodluck';

const videoTextPosition = {top:'185px', left:'700px',width:'auto', height:'auto'};
const labelTextPosition = {top:'150px', left:'100px',width:'auto', height:'auto'};
const individualLabelTextPosition = {top:'256px', left:'100px', width:'auto', height:'auto'};
const dealTextPosition = {top:'342px', left:'100px', width:'auto', height:'auto'};
const goodLuckTextPosition = {top:'185px', left:'600px' ,width:'auto', height:'auto'};

const videoWizardPosition = {top:'185px', left:'20px',width:'600px', height:'405px'};
const labelWizardPosition = {top:'150px', left:'600px',width:'600px', height:'350px'};
const individualLabelWizardPosition = {top:'256px', left:'600px', width:'580px', height:'80px'};
const dealWizardPosition = {top:'342px', left:'600px', width:'580px', height:'80px'};
const goodLuckWizardPosition = {top:'185px', left:'350px' ,width:'600px', height:'405px', backgroundColor:'white'};

const TEXTS = [videoText, labelText, individualLabelText, dealText, goodLuck];
const TEXT_POSITIONS = [videoTextPosition, labelTextPosition, individualLabelTextPosition, dealTextPosition, goodLuckTextPosition]
const WIZARD_POSITIONS = [videoWizardPosition, labelWizardPosition, individualLabelWizardPosition, dealWizardPosition, goodLuckWizardPosition];


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
                <div className='tour-card' style={WIZARD_POSITIONS[positionIndex]}>
                    <div>
                        <button onClick={() => {closeInfo()}} className='close-button'>
                            <img src="https://cdn3.emoji.gg/emojis/9636_Cross.png"
                            alt=""
                            width='20'
                            height='20'
                            />
                        </button>
                    </div>

                    <div className='tour-text' style={TEXT_POSITIONS[positionIndex]}>
                        <p>{TEXTS[textIndex]}</p>
                    </div>
                        
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
                    width="30" height="30"/>
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