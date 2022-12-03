'use client'
import React, {useState} from 'react';
import UniPopUpRating from '../UniPopUpRating'
import styles from './UniWizard.module.css';
import * as TEXT from './wizard.home.modules/text.module';
import * as POSITION from './wizard.home.modules/position.module';
import * as IMAGE from './wizard.home.modules/image.module';

const UniWizardHome = () => {

    const [wizardDisplay, setWizardDisplay] = useState(true);
    let [pageNum, setPageNum] = useState(0);

    const UniWizard = ({text, textPosition, wizardPosition, image, imageSize, imagePosition = {position:'absolute'} }) => {
    
        return (
            <div>
                {wizardDisplay && pageNum >= 0 ?
                    <div className={styles.tourCard} style={wizardPosition}>
                    <div style={imagePosition}><img src={image} alt="" width={imageSize[0]} height={imageSize[1]}/></div>
                    <div className={styles.tourText} style={textPosition}>{text}</div>
        
                    <button onClick={() => {setWizardDisplay(!wizardDisplay)}} className={styles.closeButton}>
                        <img src="https://cdn3.emoji.gg/emojis/9636_Cross.png" alt="" width='12' height='12'/>
                    </button>
                </div>
                : null}
                
            </div>
            
        );
    }
    
    const UniWizardButtons = () => {
    
        const buttonAction = (action) => {
    
            if(pageNum < 0){return}
    
            switch (action) {
                case 'back': {if (pageNum === 0) {return} else {setPageNum(pageNum -= 1); console.log(pageNum); return}}
                case 'next': {if (pageNum === 7) {return} else {setPageNum(pageNum += 1); console.log(pageNum); return}}
                case 'close': setPageNum(pageNum = -1); console.log(pageNum); return
            }        
        }
    
        return (
            <div>
                {wizardDisplay && pageNum >= 0 ?
                    <div className={styles.buttonContainer}>
                    <button onClick={() => {buttonAction('close')}} className={styles.uniButton}>❌ Close</button>
                    <button onClick={() => {buttonAction('back')}} className={styles.uniButton}>⬅ Back</button>
                    <button onClick={() => {buttonAction('next')}} className={styles.uniButton}>Next ➡</button>
                </div>
                : null}
            </div>
        );
    }

    return (
        <div>
            
            {pageNum < 0 && null}

            {pageNum === 0 ?
            <div>
                <UniWizard 
                    text={TEXT.userText} 
                    textPosition={POSITION.userTextPosition} 
                    wizardPosition={POSITION.userWizardPosition}
                    image={IMAGE.userImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.userImagePosition}>
                </UniWizard>
            </div> : null
            }
    
            {pageNum === 1 ?
                <UniWizard 
                    text={TEXT.videoText} 
                    textPosition={POSITION.videoTextPosition} 
                    wizardPosition={POSITION.videoWizardPosition}
                    image={IMAGE.videoImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.videoImagePosition}>
                </UniWizard>: null
            }   
    
            {pageNum === 2 ?
                <UniWizard 
                    text={TEXT.experimentText} 
                    textPosition={POSITION.experimentTextPosition} 
                    wizardPosition={POSITION.experimentWizardPosition}
                    image={IMAGE.experimentImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.experimentImagePosition}>
                </UniWizard>: null
            }     
    
            {pageNum === 3 ?
                <UniWizard 
                    text={TEXT.labelText} 
                    textPosition={POSITION.labelTextPosition} 
                    wizardPosition={POSITION.labelWizardPosition}
                    image={IMAGE.labelImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.labelImagePosition}>
                </UniWizard>: null
            }
    
            {pageNum === 4 ?
                <UniWizard 
                    text={TEXT.annotationText} 
                    textPosition={POSITION.annotationTextPosition} 
                    wizardPosition={POSITION.annotationWizardPosition}
                    image={IMAGE.annotationImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.annotationImagePosition}>
                </UniWizard>: null
    
            }
            
            {pageNum === 5 ?
                <UniWizard 
                    text={TEXT.userInfoText} 
                    textPosition={POSITION.userInfoTextPosition} 
                    wizardPosition={POSITION.userInfoWizardPosition}
                    image={IMAGE.userInfoImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.userInfoImagePosition}>
                </UniWizard>: null
            }
    
            {pageNum === 6 ?
                <UniWizard 
                    text={TEXT.questionText} 
                    textPosition={POSITION.questionTextPosition} 
                    wizardPosition={POSITION.questionWizardPosition}
                    image={IMAGE.questionImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.questionImagePosition}>
                </UniWizard>: null
            }

            {pageNum === 7 ?
                <UniWizard 
                    text={<UniPopUpRating popUpStartMessage='Rate this wizard' popUpEndMessage='Thanks Pantera'/>} 
                    textPosition={POSITION.ratingTextPosition} 
                    wizardPosition={POSITION.ratingTextPosition}
                    image={IMAGE.ratingImage}
                    imageSize={IMAGE.globalSize}
                    imagePosition={POSITION.ratingImagePosition}>
                </UniWizard> : null
            }
            
            <UniWizardButtons></UniWizardButtons>
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
                ? <UniWizardHome></UniWizardHome>
                : null}
            
        </div>
    );
}

export default Page;
