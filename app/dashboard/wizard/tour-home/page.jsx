'use client'

import React, {useState} from 'react';
import './style.css';

const userText = 'userTextPosition.';
const videoText = 'videoTextPosition';
const experimentText = 'experimentTextPosition';
const labelText = 'labelTextPosition';
const annotationText = 'annotationTextPosition';
const userInfoText = 'userInfoTextPosition'
const loginText = 'loginTextPosition'

const userTextPosition = {top:'100px', left:'420px', width:'auto', height:'100px'};
const videoTextPosition = {top:'100px', left:'480px', width:'auto', height:'100px'};
const experimentTextPosition = {top:'100px', left:'540px', width:'auto', height:'100px'};
const labelTextPosition =  {top:'100px', left:'650px', width:'auto', height:'100px'};
const annotationTextPosition = {top:'100px', left:'705px', width:'auto', height:'auto'};
const userInfoTextPosition = {top:'100px', left:'705px', width:'370px', height:'100px'};
const loginTextPosition = {top:'120px', left:'800px', width:'410px', height:'100px'};


const userWizardPosition = {top:'30px', left:'425px', width:'65px', height:'50px'};
const videoWizardPosition = {top:'30px', left:'485px', width:'68px', height:'50px'};
const experimentWizardPosition = {top:'30px', left:'545px', width:'115px', height:'50px'};
const labelWizardPosition =  {top:'30px', left:'655px', width:'65px', height:'50px'};
const annotationWizardPosition = {top:'30px', left:'715px', width:'115px', height:'50px'};
const userInfoTextWizardPosition = {top:'20px', left:'985px', width:'100px', height:'70px'};
const loginTextWizardPosition = {top:'7px', left:'1075px', width:'150px', height:'100px'};

const TEXTS = [userText, videoText, experimentText, labelText, annotationText, userInfoText, loginText];
const TEXT_POSITIONS = [userTextPosition, videoTextPosition, experimentTextPosition, labelTextPosition, annotationTextPosition, userInfoTextPosition, loginTextPosition]
const WIZARD_POSITIONS = [userWizardPosition, videoWizardPosition, experimentWizardPosition, labelWizardPosition, annotationWizardPosition, userInfoTextWizardPosition, loginTextWizardPosition];


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
                            width='10'
                            height='10'
                            />
                        </button>
                    </div>

                    <div className='tour-text' style={TEXT_POSITIONS[positionIndex]}>
                        <p>{TEXTS[textIndex]}</p>
                    </div>
                        
                </div>

                    <div className='button-container'>
                        <button onClick={() => {closeInfo()}} className='uni-button'>❌ Close</button>
                        <button onClick={() => {backAction()}} className='uni-button'>⬅ Back</button>
                        <button onClick={() => {nextAction()}} className='uni-button'>Next ➡</button>
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
        <div className="fix-display">
            <ButtonInfo></ButtonInfo>
            {infoState
                ? <UniWizard></UniWizard>
                : null}
            
        </div>
    );
}

export default Page;