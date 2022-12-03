'use client'
import React, {useState} from 'react';
import styles from './UniWizard.module.css' 

const videoText = `Here is the place where the video will play. You can stop the video whenever you want
but you can't rewind. Once the video ends, you will not be able to play it again.`;
const labelText = `In this section you will find the labels. It can contain one or more tags depending on
of the experiment`;
const individualLabelText = `These tags represent human emotions.`;
const dealText = `These others determine if there has been a deal in a sales meeting or if, 
on the contrary, if there had been a previous deal, it would have been rejected.`;
const mainGoal = `The main objective is to be able to determine at what specific moment in a video, one of the emotions found in the labels section has occurred.
So, anytime you detect one of those emotions, 
click on the corresponding label.`;

const videoTextPosition = {top:'185px', left:'700px',width:'400px', height:'auto'};
const labelTextPosition = {top:'200px', left:'100px',width:'400px', height:'auto'};
const individualLabelTextPosition = {top:'200px', left:'700px', width:'auto', height:'auto'};
const dealTextPosition = {top:'440px', left:'680px', width:'400px', height:'auto'};
const mainGoalTextPosition = {top:'80px', left:'400px' ,width:'500px', height:'auto'};

const videoWizardPosition = {top:'185px', left:'20px',width:'600px', height:'405px'};
const labelWizardPosition = {top:'150px', left:'600px',width:'600px', height:'350px'};
const individualLabelWizardPosition = {top:'256px', left:'600px', width:'580px', height:'80px'};
const dealWizardPosition = {top:'342px', left:'600px', width:'580px', height:'80px'};
const mainGoalWizardPosition = {top:'185px', left:'40px' ,width:'1110px', height:'405px'};

const TEXTS = [videoText, labelText, individualLabelText, dealText, mainGoal];
const TEXT_POSITIONS = [videoTextPosition, labelTextPosition, individualLabelTextPosition, dealTextPosition, mainGoalTextPosition]
const WIZARD_POSITIONS = [videoWizardPosition, labelWizardPosition, individualLabelWizardPosition, dealWizardPosition, mainGoalWizardPosition];


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
                <div className={styles.tourCard} style={WIZARD_POSITIONS[positionIndex]}>
                    <div>
                        {textIndex === 0
                            ? 
                            <div className={styles.arrowImg}>
                                <img src="../ilustrations/Arrow.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 1
                        ? 
                            <div className={styles.labelsImg}>
                                <img src="../ilustrations/Pomodoro technique.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 2
                        ? 
                            <div className={styles.emotionsImg}>
                                <img src="../ilustrations/Thanks.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 3
                        ? 
                            <div className={styles.dealImg}>
                                <img src="../ilustrations/Approved.png" alt=""
                                width='500' height='400'
                                />
                            </div>
                            : null}

                        {textIndex === 4 
                        ? 
                        <div>

                            <div className={styles.smilingFace}>
                                <img src="https://officialpsds.com/imageview/7m/81/7m819x_large.png?1521316578" alt="" width='285' height='285'/>
                            </div>

                            <div className={styles.cursorHand}>
                                <img src="https://www.freeiconspng.com/uploads/hand-cursor-png-click-cursor-hand-icon-13.png" alt=""
                                    width='50'
                                    height='50'/>
                            </div>

                            <div className={styles.searchingImg}>
                                <img src="../ilustrations/Detective check footprint.png" alt=""
                                width='285' height='285'/>
                            </div>
                            
                        </div>

                        : null}

                        <button onClick={() => {closeInfo()}} className={styles.closeButton}>
                            <img src="https://cdn3.emoji.gg/emojis/9636_Cross.png"
                            alt=""
                            width='20'
                            height='20'
                            />
                        </button>
                    </div>

                    <div className={styles.tourText} style={TEXT_POSITIONS[positionIndex]}>
                        {TEXTS[textIndex]}
                    </div>
                        
                </div>

                    <div className={styles.buttonContainer}>
                        <button onClick={() => {closeInfo()}} className={styles.uniButton}>❌ Close</button>
                        <button onClick={() => {backAction()}} className={styles.uniButton}>⬅ Back</button>
                        <button onClick={() => {nextAction()}} className={styles.uniButton}>Next ➡</button>
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
                <button onClick={() => {showInfo()}} className={styles.question}>
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