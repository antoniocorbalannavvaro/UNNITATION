'use client'

import React, {useState} from 'react';
import './style.css';

const userText = `In the users section you can invite, add and modify any user you want.
You can also get additional information of your users such as name, age, interrelated agreement and others by adding filters.`;

const videoText = `In the video section you can search and upload sales meeting videos and videos transcripts.
You can filter by platform, language, duration...`;

const experimentText = `This is where the magic is done. In this section you will select a group of videos, 
a population of users and different labels to create an annotation experiment. 
Here you can consult the history of experiments and see their results. 
You can also download the results in CSV or XML format`;

const labelText = `Create tags based on your needs to be able to include them in your experiments. 
You can create as many as you need.`;

const annotationText = `In the annotation section, all those users who have the annotator role and have been selected 
for an experiment will be able to enter and annotate videos`;

const userInfoText = `Here you can check the information associated with your account. 
You can check if you're participating in an experiment, as well as see your allotted weekly annotation time.`

const questionText = `Every time you get lost in this platform, 
don't forget to click on the question marks for a usage tutorial.`;

const userTextPosition = {top:'100px', left:'200px', width:'400px', height:'auto'};
const videoTextPosition = {top:'100px', left:'250px', width:'400px', height:'auto'};
const experimentTextPosition = {top:'100px', left:'300px', width:'400px', height:'auto'};
const labelTextPosition =  {top:'100px', left:'650px', width:'400px', height:'auto'};
const annotationTextPosition = {top:'100px', left:'705px', width:'400px', height:'auto'};
const userInfoTextPosition = {top:'100px', left:'705px', width:'400px', height:'auto'};
const questionTextPosition = {top:'120px', left:'800px', width:'400px', height:'auto'};


const userWizardPosition = {top:'30px', left:'425px', width:'65px', height:'50px'};
const videoWizardPosition = {top:'30px', left:'485px', width:'68px', height:'50px'};
const experimentWizardPosition = {top:'30px', left:'545px', width:'115px', height:'50px'};
const labelWizardPosition =  {top:'30px', left:'655px', width:'65px', height:'50px'};
const annotationWizardPosition = {top:'30px', left:'715px', width:'115px', height:'50px'};
const userInfoTextWizardPosition = {top:'20px', left:'985px', width:'100px', height:'70px'};
const questionTextWizardPosition = {top:'34px', left:'908px', width:'80px', height:'42px'};

const TEXTS = [userText, videoText, experimentText, labelText, annotationText, userInfoText, questionText];
const TEXT_POSITIONS = [userTextPosition, videoTextPosition, experimentTextPosition, labelTextPosition, annotationTextPosition, userInfoTextPosition, questionTextPosition]
const WIZARD_POSITIONS = [userWizardPosition, videoWizardPosition, experimentWizardPosition, labelWizardPosition, annotationWizardPosition, userInfoTextWizardPosition, questionTextWizardPosition];


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
                        {textIndex === 0
                            ? 
                            <div className='users-img'>
                                <img src="../ilustrations/People of different races together.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 1
                        ? 
                            <div className='videos-img'>
                                <img src="../ilustrations/Video calling with friends.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 2
                        ? 
                            <div className='experiment-img'>
                                <img src="../ilustrations/Stem-cell research.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 3
                        ? 
                            <div className='label-img'>
                                <img src="../ilustrations/Going offline.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 4 
                        ? 
                            <div className='annotation-img'>
                                <img src="../ilustrations/Gaming.png" alt="" width='450' height='350'/>
                            </div>

                        : null}

                        {textIndex === 5
                        ? 
                            <div className='user-info-img'>
                                <img src="../ilustrations/User-research.png" alt="" width='500' height='400'/>
                            </div>

                        : null}

                        {textIndex === 6
                        ? 
                            <div className='question-img'>
                                <img src="../ilustrations/Writer8217s-block.png" alt="" width='500' height='400'/>
                            </div>

                        : null}

                        <button onClick={() => {closeInfo()}} className='close-button'>
                            <img src="https://cdn3.emoji.gg/emojis/9636_Cross.png"
                            alt=""
                            width='10'
                            height='10'
                            />
                        </button>
                    </div>

                    <div className='tour-text' style={TEXT_POSITIONS[positionIndex]}>
                        {TEXTS[textIndex]}
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