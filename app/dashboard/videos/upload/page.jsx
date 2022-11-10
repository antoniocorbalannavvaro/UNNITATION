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
                        <label htmlFor="videoUrl">Video URL</label>
                        <Field
                        type="URL" 
                        id="videoUrl" 
                        name="videoUrl" 
                        />
                        <ErrorMessage name="videoUrl" 
                        component={() => (<div className="error">{errors.videoUrl}</div>)} />
                    </div>    

                    <div>
                        <label>Video Has Transcrypt?</label>
                        <label>
                        <Field onClick={() => {setTranscryptState('yes')}} type="radio" name="isTranscrypt" value="true" /> Yes
                        </label>
                        <label>
                        <Field onClick={() => {setTranscryptState('no')}} type="radio" name="isTranscrypt" value="false" /> No
                        </label>
                        <ErrorMessage name="isTranscrypt" component={() => (<div>{errors.isTranscrypt}</div>)} />
                        {transcryptState === 'yes' 
                            ? <TranscryptURLComp></TranscryptURLComp>
                            : null}
                    </div>                 

                    <div>
                        <label htmlFor="participants">Nº Participants:</label>
                        <Field id="participants" type="number" name="participants" placeholder='Add Number'/>
                        <ErrorMessage name="participants" component={() => (<div className="error">{errors.participants}</div>)} />
                    </div>

                    <div>
                        <label htmlFor="videoCreationDate">Video Creation:</label>
                        <Field id="videoCreationDate" type="date" name="videoCreationDate"/>
                        <ErrorMessage name="videoCreationDate" component={() => (<div className="error">{errors.videoCreationDate}</div>)} />
                    </div>

                    <div>
                        <label>Language</label>
                        <Field name="language" as="select">
                            <option value='null'>-</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="german">German</option>
                            <option value="french">French</option>
                            <option value="chinese">Chinese</option>
                            <option value="russian">Russian</option>
                        </Field>
                        <ErrorMessage name="language" component={() => (<div className="error">{errors.language}</div>)} />
                    </div>

                    <div>
                        <label>Platform</label>
                        <Field name="platform" as="select">
                            <option value="null">-</option>
                            <option value="zoom">Zoom</option>
                            <option value="meet">Meet</option>
                            <option value="team">Team</option>
                        </Field>
                        <ErrorMessage name="platform" component={() => (<div className="error">{errors.platform}</div>)} />
                    </div>

                    <div>
                        <label>Deal Predisposition</label>
                        <Field name="dealDisposition" as="select">
                            <option value="null">-</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </Field>
                        <ErrorMessage name="dealDisposition" component={() => (<div className="error">{errors.dealDisposition}</div>)} />
                    </div>

                    <div>
                        <label>Actors?</label>
                        <label>
                            <Field type="radio" name="actors" value="true" /> Yes
                        </label>
                        <label>
                            <Field type="radio" name="actors" value="false" /> No
                        </label>
                        <ErrorMessage name="actors" component={() => (<div className="error">{errors.actors}</div>)} />
                    </div>

                    <div>
                        <label>Sales Meeting?</label>
                        <label>
                            <Field type="radio" name="salesMeeting" value="true" /> Yes
                        </label>
                        <label>
                            <Field type="radio" name="salesMeeting" value="false" /> No
                        </label>
                        <ErrorMessage name="salesMeeting" component={() => (<div className="error">{errors.salesMeeting}</div>)} />
                    </div>

                

						<button type="submit">Login</button>
						{formSend && <p className="exito">Video uploaded successfully!</p>}

					</Form>
				)}
			</Formik>
		</>
	);
}


export default VideoUploadForm;