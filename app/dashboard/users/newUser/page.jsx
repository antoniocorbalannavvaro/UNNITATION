'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {TranscryptURLComp} from './form.components';
import { loginSchema, initialParams } from './LoginSchemaUploadVideo';

const VideoUploadForm = () => {

    const [transcryptState, setTranscryptState] = useState('false');
	const [formSend, changeFormSend] = useState(false);

	return (
		<>
			<Formik
				initialValues={initialParams}
                validationSchema = {loginSchema}

				onSubmit={(params, {resetForm}) => {
                    //TODO send to the vaquen
                    console.log('Data: ',params);
					//resetForm();
					changeFormSend(true);
					setTimeout(() => changeFormSend(false), 5000);
				}}
			>
				{( {errors} ) => (
					<Form>

                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <Field
                        id="fullName" 
                        name="fullName" 
                        />
                        <ErrorMessage name="fullName" 
                        component={() => (<div className="error">{errors.fullName}</div>)} />
                    </div>    
      

                    <div>
                        <label htmlFor="age">Age:</label>
                        <Field id="age" type="number" name="age" placeholder='Add Number'/>
                        <ErrorMessage name="age" component={() => (<div className="error">{errors.age}</div>)} />
                    </div>

                    <div>
                        <label>Gender</label>
                        <Field name="gender" as="select">
                            <option value='null'>-</option>
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </Field>
                        <ErrorMessage name="gender" component={() => (<div className="error">{errors.gender}</div>)} />
                    </div>

                    <div>
                        <label>Working Department</label>
                        <Field name="workingDepartment" as="select">
                            <option value="null">-</option>
                            <option value="sales">Sales</option>
                            <option value="marketing">Marketing</option>
                            <option value="it">IT</option>
                            <option value="dataScience">Data Science</option>
                            <option value="manager">Manager</option>
                        </Field>
                        <ErrorMessage name="workingDepartment" component={() => (<div className="error">{errors.workingDepartment}</div>)} />
                    </div>

                    <div>
                        <label>1er Language</label>
                        <Field name="firstLanguage" as="select">
                            <option value='null'>-</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="german">German</option>
                            <option value="french">French</option>
                            <option value="chinese">Chinese</option>
                            <option value="russian">Russian</option>
                        </Field>
                        <ErrorMessage name="firstLanguage" component={() => (<div className="error">{errors.firstLanguage}</div>)} />
                    </div>

                    <div>
                        <label>2nd Language</label>
                        <Field name="secondLanguage" as="select">
                            <option value='null'>-</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="german">German</option>
                            <option value="french">French</option>
                            <option value="chinese">Chinese</option>
                            <option value="russian">Russian</option>
                        </Field>
                        <ErrorMessage name="secondLanguage" component={() => (<div className="error">{errors.secondLanguage}</div>)} />
                    </div>

                    <div>
                        <label>Proficiency 2nd Language</label>
                        <Field name="proficiencySecondLanguage" as="select">
                            <option value='null'>-</option>
                            <option value="a1">A1</option>
                            <option value="a2">A2</option>
                            <option value="b1">B1</option>
                            <option value="b2">B2</option>
                            <option value="c1">C1</option>
                            <option value="c2">C2</option>
                            <option value="native">Native</option>
                        </Field>
                        <ErrorMessage name="proficiencySecondLanguage" component={() => (<div className="error">{errors.proficiencySecondLanguage}</div>)} />
                    </div>

						<button type="submit">Login</button>
						{formSend && <p className="exito">Successfully!</p>}

					</Form>
				)}
			</Formik>
		</>
	);
}


export default VideoUploadForm;