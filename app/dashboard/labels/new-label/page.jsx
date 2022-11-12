'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {initialParams, schema} from './schema';
import EmojiPicker from 'emoji-picker-react';

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
						<div>
							<label htmlFor="labelName">Label Name:</label>
							<Field
								type="text" 
								id="labelName" 
								name="labelName" 
							/>

							<ErrorMessage name="labelName" component={() => (
                            <div className="error">{errors.labelName}</div>)} />
						</div>
						
						<div>
							<label htmlFor="labelColor">Label Color:</label>
							<Field
								type="color" 
								id="labelColor" 
								name="labelColor" 
							/>
							<ErrorMessage name="labelColor" component={() => (
                            <div className="error">{errors.labelColor}</div>)} />
						</div>

						
						<div>
     						 {/*EMOJI FORM*/}
    					</div>

						<div>
							<label htmlFor='labelDescription'>Description:</label>
							<Field id ='labelDescription' name="labelDescription" as="textarea" placeholder="Description..." />
							<ErrorMessage name="labelDescription" component={() => (
                            <div className="error">{errors.labelDescription}</div>)} />
						</div>

						<button type="submit">Create Label</button>
						{formSend && <p style={{color:'green'}} className="exito">Label successfully created!</p>}						
					</Form>
				)}
			</Formik>
		</>
	);
}
 
export default Page;