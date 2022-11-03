'use client'
import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {PageWrapper, Label, CodeWrapper} from "../../../login/styles";

const loginSchema = Yup.object().shape(
    {
        videoUrl: Yup.string()
                .url('URL invalid format')
                .required('URL is required.'),

        isTranscrypt: Yup.boolean()
                .required('Transcrypt is required.'),

        transcryptUrl: Yup.string()
                .url('URL invalid format')
                .required('Transcrypt URL is required.'),

        salesMeeting: Yup.boolean()
                .required('Sales Meeting is required.'),

        actors: Yup.number()
                .required('Actors are required.'),

        agentNames: Yup.number()
                .required('Agent Names are required.'),

        participants: Yup.number()
                .required('Number of participants is required.'),

        language: Yup.string()
                .required('Language is required.'),

        platform: Yup.string()
                .required('Platform is required.'),

        dealDisposition: Yup.boolean()
                .required('Deal Disposition is required.'),

        videoCreationDate: Yup.date()
                .required('Video Creation Date is required.')
    }
);

const UploadVideoComponent = () => {

    const initialCredentials = {
        videoUrl: '',
        isTranscrypt: 'null',
        transcryptUrl: '',
        salesMeeting: 'null',
        actors: 'null',
        agentNames: '',
        participants: 'null',
        language: 'null',
        platform: 'null',
        dealDisposition: 'null',
        videoCreationDate: 'null'
    }

    const checkForm = (param) => {
        const validation = Object.values(param).find((x) => x === 'null');
        if(validation === 'null'){
            console.log(param);
            alert('Check it makina, there are some campos empty');
        }
        //TODO Send to the vaquen
        else {
            console.log('Vamooooos', param)
        }
    }

    return (
        <PageWrapper>
        <div>
          <h4>UPLOAD VIDEO</h4>
            <Formik
                initialValues = {initialCredentials}
                validationSchema = {loginSchema}
                
                onSubmit = {async (values) => {
                    await new Promise((r) => setTimeout(r, 50));
                    //Return credential in JSON ==>
                    console.log(values);
                }}
            >
            {({ values, touched, errors, isSubmitting, handleChange, handleBlur,}) => (
                <Form>
                    <Label>
                    <label htmlFor="videoUrl">Video URL:</label>
                    <Field id="videoUrl" type="URL" name="videoUrl" placeholder="Paste Video URL"/>
                    </Label>

                    <Label>
                    <label htmlFor="transcryptUrl">Transcrypt URL:</label>
                    <Field id="transcryptUrl" type="URL" name="transcryptUrl" placeholder="Paste Transcrypt URL"/>
                    </Label>

                    <Label>
                    <label htmlFor="agentNames">Agent's Name:</label>
                    <Field id="agentNames" type="string" name="agentNames"/>
                    </Label>

                    <Label>
                    <label htmlFor="participants">Nº Participants:</label>
                    <Field id="participants" type="number" name="participants" placeholder='Add Number'/>
                    </Label>

                    <Label>
                    <label htmlFor="platform">Platform:</label>
                    <Field id ='platform' name="platform" as="select">
                        <option value="null">-</option>
                        <option value="zoom">Zoom</option>
                        <option value="meet">Meet</option>
                        <option value="team">Team</option>
                    </Field>
                    </Label>

                    <Label>
                    <label htmlFor="language">Language:</label>
                    <Field id='language' name="language" as="select">
                        <option value='null'>-</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="german">German</option>
                        <option value="french">French</option>
                        <option value="chinese">Chinese</option>
                        <option value="russian">Russian</option>
                    </Field>
                    </Label>

                    <Label>
                    <label htmlFor="dealDisposition">Deal Predisposition:</label>
                    <Field id='dealDisposition' name="dealDisposition" as="select">
                        <option value="null">-</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Field>
                    </Label>

                    <Label>
                    <label htmlFor="videoCreationDate">Video Creation:</label>
                    <Field id="videoCreationDate" type="date" name="videoCreationDate"/>
                    </Label>

                    <Label>
                    <label htmlFor="isTranscrypt">Video Has Transcrypt?:</label>
                    <Field id='isTranscrypt' name="isTranscrypt" as="select">
                        <option value="null">-</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Field> 
                    </Label>

                    <Label>
                    <label htmlFor="actors">Actors?:</label>
                    <Field id='actors' name="actors" as="select">
                        <option value="null">-</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Field> 
                    </Label>

                    <Label>
                    <label htmlFor="salesMeeting">Sales Meeting?:</label>
                    <Field id='salesMeeting' name="salesMeeting" as="select">
                        <option value="null">-</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Field> 
                    </Label>

                    <Label>
                    <button type="submit" onClick={() => checkForm(values)} >Upload</button>
                    </Label>

                </Form> 
            )}
            </Formik>
        </div>
        </PageWrapper>
    );
}

export default UploadVideoComponent;