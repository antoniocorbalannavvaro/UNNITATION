'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {initialParams, schema} from './schema';

const LABELS = 
{
    happyness: {color:'2254fc', emoji:':smile'},
    sadness: {color:'414faa', emoji:':sad'},
    heresitation: {color:'19c39f', emoji:':heresitation'}
};

const ANNOTATORS = 
{
    'topo@gmail.com': {fullName:'Antonio Corbalan Navarro',
                       age: 26, 
                       department:'marketing',
                       gender:'v',
                       firstLanguage:'spanish',
                       secondLanguage:'english',
                       prociencySecondLanguage:'b2'},

    'ceo@gmail.com':  {fullName:'El CEO',
                       age: 27, 
                       department:'dataScience',
                       gender:'v',
                       firstLanguage:'spanish',
                       secondLanguage:'english',
                       prociencySecondLanguage:'c1'}
};

const Page = () => {

	const [formSend, changeFormSend] = useState(false);
	
	return (
		<>
			<Formik
				initialValues={{initialParams}}
				validationSchema = {schema}

				onSubmit={(params, {resetForm}) => {
                    //Send data to the vaquen.
					resetForm();
                    console.log('Data: ',params);
					changeFormSend(true);
					setTimeout(() => changeFormSend(false), 5000);
				}}
			>
				{( {errors} ) => (
					<Form className="formulario">


						<button type="submit">Create Experiment</button>
						{formSend && <p style={{color:'green'}} className="exito">Experiment successfully created!</p>}						
					</Form>
				)}
			</Formik>
		</>
	);
}

export default Page;