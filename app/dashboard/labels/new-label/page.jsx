'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {initialParams, schema} from './schema';
import EmojiPicker from 'emoji-picker-react';

const Page = () => {

	const [formSend, changeFormSend] = useState(false);
	const [showEmojiComp, setShowEmojiComp] = useState(false);

	var emojiChosen = 'Any';
	const emojiButtonOn = 'Hide Emojis';
	const emojiButtonOff = 'Show Emojis';

	return (
		<>
			<Formik
				initialValues={{initialParams}}
				validationSchema = {schema}

				onSubmit={(params, {resetForm}) => {
                    //Send data to the vaquen.
					params['emoji'] = emojiChosen;
                    console.log('Data: ', params);
					changeFormSend(true);
					resetForm();
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
							
							<button onClick={() => setShowEmojiComp(!showEmojiComp)}>{showEmojiComp ? emojiButtonOn : emojiButtonOff}</button>
							{showEmojiComp ? 
								<div>
									<h4>You have chosen: {emojiChosen}</h4>
									<EmojiPicker onEmojiClick={(e) => 
									{
										emojiChosen = e.emoji;
										console.log(emojiChosen);
									}}>
									</EmojiPicker>
								</div> 
							: null}

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