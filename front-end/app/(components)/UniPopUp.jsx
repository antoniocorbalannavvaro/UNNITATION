'use client'
import styles from './UniPopUp.module.css';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const UniPopUp = () => (
    <Popup trigger={
    <button className={styles.buttonAvatar}>
        <img className={styles.avatar} 
             src="http://www.smartpowerdrink.com/pub/skin/default-skin/img/avatar.png"> 
        </img>
    </button>} position="bottom center">

        <div>
            <p>antoniocn1996@gmail.com</p>
            <p>Antonio Corbalan Navarro</p>
            <p>Annotator</p>
            <p>Marketing</p>
            <p>Languages:</p>
            <ul>
                <li>Spanish</li>
                <li>English</li>
            </ul>
        </div>
    </Popup>
);

export default UniPopUp;