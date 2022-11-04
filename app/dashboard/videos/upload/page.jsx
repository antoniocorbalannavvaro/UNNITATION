'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape(
    {
        videoUrl: Yup.string()
                .url('URL invalid format')
                .required('URL is required.'),

        isTranscrypt: Yup.string()
                .required('Transcrypt is required.'),

        transcryptUrl: Yup.string()
                .url('URL invalid format')
                .required('Transcrypt URL is required.'),

        salesMeeting: Yup.string()
                .required('Sales Meeting is required.'),

        actors: Yup.string()
                .required('Actors are required.'),

        agentNames: Yup.string()
                .required('Agent Names are required.'),

        participants: Yup.number()
                .required('Number of participants is required.'),

        language: Yup.string()
                .required('Language is required.'),

        platform: Yup.string()
                .required('Platform is required.'),

        dealDisposition: Yup.string()
                .required('Deal Disposition is required.'),

        videoCreationDate: Yup.date()
                .required('Video Creation Date is required.')
    }
);

const VideoUploadForm = () => {
    
    const checkForm = (param) => {
        const validation = Object.values(param).find((x) => x === 'null' || x === '');

        if(validation === 'null'){
            console.log(param);
            alert('Check it makina, there are some campos empty');
        }

        else {
            console.log('Vamooooos', param)
        }
    }

	const [formSend, changeFormSend] = useState(false);

	return (
		<>
			<Formik
				initialValues={{
                    videoUrl: '',
                    isTranscrypt: '',
                    transcryptUrl: '',
                    salesMeeting: '',
                    actors: '',
                    agentNames: '',
                    participants: '',
                    language: '',
                    platform: '',
                    dealDisposition: '',
                    videoCreationDate: ''
				}}

                validationSchema = {loginSchema}

				validate={(params) => {
					let formErrors = {};

					return formErrors;
				}}

				onSubmit={(params, {resetForm}) => {
                    //TODO send to the vaquen
					resetForm();
                    console.log('Params',params);
					changeFormSend(true);
					setTimeout(() => changeFormSend(false), 5000);
				}}
			>
				{( {errors, props} ) => (
					<Form className="formulario">
						<div>
							<label htmlFor="videoUrl">Video URL</label>
							<Field
								type="URL" 
								id="videoUrl" 
								name="videoUrl" 
							/>
							<ErrorMessage name="videoUrl" component={() => (<div className="error">{errors.videoUrl}</div>)} />
						</div>

                        <div>
							<label htmlFor="transcryptUrl">Transcrypt URL</label>
							<Field
								type="URL" 
								id="transcryptUrl" 
								name="transcryptUrl" 
							/>
							<ErrorMessage name="transcryptUrl" component={() => (<div className="error">{errors.transcryptUrl}</div>)} />
						</div>

                        <div>
							<label htmlFor="agentNames">Agent Names</label>
							<Field
								type="text" 
								id="agentNames" 
								name="agentNames" 
							/>
							<ErrorMessage name="agentNames" component={() => (<div className="error">{errors.agentNames}</div>)} />
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
                            <label>Video Has Transcrypt?</label>
							<label>
								<Field type="radio" name="isTranscrypt" value="true" /> Yes
							</label>
							<label>
								<Field type="radio" name="isTranscrypt" value="false" /> No
							</label>
                            <ErrorMessage name="isTranscrypt" component={() => (<div className="error">{errors.isTranscrypt}</div>)} />
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

						<button type="submit">Upload</button>
						{formSend && <p className="exito">Video uploaded successfully!</p>}

					</Form>
				)}
			</Formik>
		</>
	);
}
 
export default VideoUploadForm;