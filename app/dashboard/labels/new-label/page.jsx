'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {initialParams, loginSchema} from './labelSchema';

const LabelForm = () => {
	const [formSend, changeFormSend] = useState(false);
	return (
		<>
			<Formik
				initialValues={{initialParams}}
				validationSchema = {loginSchema}

				onSubmit={(params, {resetForm}) => {
                    //Send data to the vaquen.
                    console.log('Data: ',params);
					//resetForm();
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
							<label htmlFor="color">Label Color:</label>
							<Field
								type="text" 
								id="color" 
								name="color" 
							/>
							<ErrorMessage name="color" component={() => (
                            <div className="error">{errors.color}</div>)} />
						</div>

						<div>
							<label htmlFor="labelName">Emoji:</label>
								<Field
									type="text" 
									id="emoji" 
									name="emoji" 
								/>
								<ErrorMessage name="emoji" component={() => (
							<div className="error">{errors.emoji}</div>)} />
						</div>

						<div>
							<label htmlFor='description'>Description:</label>
							<Field id ='description' name="description" as="textarea" placeholder="Description..." />
							<ErrorMessage name="description" component={() => (
                            <div className="error">{errors.description}</div>)} />
						</div>

						<button type="submit">Create Label</button>
						{formSend && <p className="exito">Label successfully created</p>}

					</Form>
				)}
			</Formik>
		</>
	);
}
 
export default LabelForm;