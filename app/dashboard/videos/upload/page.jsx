'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {TranscryptURLComp, SalesMeetingOptionalComp} from './form.optional.components';
import { loginSchema, initialParams } from './LoginSchemaUploadVideo';
import App from './example';

const styleUploadForm = {
    backgroundColor: 'aliceblue',
    padding: '20px',
    display: 'right',
    border:'2px solid grey',
    margin: '5px'
}

const errorStyle = {
    color: 'red'
}

const Example = () => {
    return(
        <div>
            <App></App>
        </div>
    );
}

const VideoUploadForm = () => {

    const [transcryptState, setTranscryptState] = useState('false');
    const [salesMeetingState, setSalesMeetingState] = useState('false');
	const [formSend, changeFormSend] = useState(false);

	return (
		<>
			<Formik
				initialValues={initialParams}
                validationSchema = {loginSchema}

				validate={(params) => {
					let formErrors = {};

					return formErrors;
				}}

				onSubmit={(params, {resetForm}) => {
                    //TODO send to the vaquen
					//resetForm();
                    console.log('Params',params);
					changeFormSend(true);
					setTimeout(() => changeFormSend(false), 5000);
				}}
			>
				{( {errors} ) => (
					<Form>
                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}} htmlFor="videoUrl">Video URL</label>
                            <Field
                            type="URL" 
                            id="videoUrl" 
                            name="videoUrl" 
                            />
                            <ErrorMessage name="videoUrl" 
                            component={() => (<div style={errorStyle}>{errors.videoUrl}</div>)} />
                        </div>                        

                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}} htmlFor="participants">Nº Participants:</label>
                            <Field id="participants" type="number" name="participants" placeholder='Add Number'/>
                            <ErrorMessage name="participants" component={() => (<div style={errorStyle}>{errors.participants}</div>)} />
                        </div>   

                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}} htmlFor="videoCreationDate">Video Creation:</label>
                            <Field id="videoCreationDate" type="date" name="videoCreationDate"/>
                            <ErrorMessage name="videoCreationDate" component={() => (<div style={errorStyle}>{errors.videoCreationDate}</div>)} />
                        </div>                    
                        
                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}}>Language</label>
                            <Field name="language" as="select">
                                <option value='null'>-</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="german">German</option>
                                <option value="french">French</option>
                                <option value="chinese">Chinese</option>
                                <option value="russian">Russian</option>
                            </Field>
                            <ErrorMessage name="language" component={() => (<div style={errorStyle}>{errors.language}</div>)} />
                        </div>

                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}}>Platform</label>
                            <Field name="platform" as="select">
                                <option value="null">-</option>
                                <option value="zoom">Zoom</option>
                                <option value="meet">Meet</option>
                                <option value="team">Team</option>
                            </Field>
                            <ErrorMessage name="platform" component={() => (<div style={errorStyle}>{errors.platform}</div>)} />
                        </div>

                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}}>Deal Predisposition</label>
                            <Field name="dealDisposition" as="select">
                                <option value="null">-</option>
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </Field>
                            <ErrorMessage name="dealDisposition" component={() => (<div style={errorStyle}>{errors.dealDisposition}</div>)} />
                        </div>

                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}}>Actors?</label>
                            <label>
                                <Field type="radio" name="actors" value="true" /> Yes
                            </label>
                            <label>
                                <Field type="radio" name="actors" value="false" /> No
                            </label>
                            <ErrorMessage name="actors" component={() => (<div style={errorStyle}>{errors.actors}</div>)} />
                        </div>

                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}}>Video Has Transcrypt?</label>
                            <label>
                            <Field onClick={() => {setTranscryptState('yes')}} type="radio" name="isTranscrypt" value="true" /> Yes
                            </label>
                            <label>
                            <Field onClick={() => {setTranscryptState('no')}} type="radio" name="isTranscrypt" value="false" /> No
                            </label>
                            <ErrorMessage name="isTranscrypt" component={() => (<div style={errorStyle}>{errors.isTranscrypt}</div>)} />
                            {transcryptState === 'yes' 
                                ? <TranscryptURLComp></TranscryptURLComp>
                                : null}
                        </div>
                
                        <div className='card m-5' style={styleUploadForm}>
                            <label style={{fontWeight: 'bold'}}>Sales Meeting?</label>
                            <label>
                                <Field onClick={() => setSalesMeetingState('true')} type="radio" name="salesMeeting" value="true" /> Yes
                            </label>
                            <label>
                                <Field onClick={() => setSalesMeetingState('false')} type="radio" name="salesMeeting" value="false" /> No
                            </label>
                            <ErrorMessage name="salesMeeting" component={() => (<div style={errorStyle}>{errors.salesMeeting}</div>)} />
                            {salesMeetingState === 'true' 
                                ? <Example></Example> 
                                : null}
                        </div>

						<button className="btn btn-primary ms-3" style={{position:'center'}}type="submit">Upload</button>
						{formSend && <p className="exito">Video uploaded successfully!</p>}

					</Form>
				)}
			</Formik>
		</>
	);
}


export default VideoUploadForm;