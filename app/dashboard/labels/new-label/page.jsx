'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EmojiPicker from 'emoji-picker-react';

function Example() {
  return (
    <div>
      <EmojiPicker />
    </div>
  );
}

const LabelForm = () => {
	const [formSend, changeFormSend] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					labelName: '',
					color: '',
					emoji: '',
					description: ''
				}}

                //validationSchema = {loginSchema}

				validate={(params) => {
					let formErrors = {};
					return formErrors;
				}}

				onSubmit={(params, {resetForm}) => {
                    //Send data to the vaquen.
                    console.log('Data: ',params);
					resetForm();
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
								type="color" 
								id="color" 
								name="color" 
							/>
							<ErrorMessage name="color" component={() => (
                            <div className="error">{errors.color}</div>)} />
						</div>

						<div>
							<Example></Example>
						</div>

						<div>
							<label htmlFor='description'>Description:</label>
							<Field id ='description' name="description" as="textarea" placeholder="Description..." />
							<ErrorMessage name="description" component={() => (
                            <div className="error">{errors.description}</div>)} />
						</div>

						<button type="submit">Login</button>
                        
						{formSend && <p className="exito">Create Label</p>}
					</Form>
				)}
			</Formik>
		</>
	);
}
 
export default LabelForm;