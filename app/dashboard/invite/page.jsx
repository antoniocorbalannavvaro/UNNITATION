'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formSchema, initialParams } from './FormSchema';
import getData from '../../../fetch.get.module';
import sendData from '../../../fetch.post.module';

const roles = await getData('user_role');

const InviteForm = () => {

    const [formSend, changeFormSend] = useState(false);
    const [isAnnotator, setIsAnnotator] = useState(false);

    const changeAnnotatorState = (value) => {
        setIsAnnotator(!isAnnotator);
    }

    const getRoles = () => {
        return roles.map((i) => {
            if(i === 'ANNOTATOR'){
                return <label>
                <Field onClick={() => changeAnnotatorState(false)} type="checkbox" name="role" value={i} />
                {i.replace('_',' ').toLowerCase()}</label>}
            else 
                return <label><Field type="checkbox" name="role" value={i} />{i.replace('_',' ').toLowerCase()}</label> })
           
    }
    
    const TimeForm = () => {
        return (
            <div>
                <label htmlFor="annotationTime">Annotation Time:</label>
                <Field id="annotationTime" type="number" name="annotationTime"/>
                <ErrorMessage name="annotationTime" component={() => (<div className="error">Annotation Time is Required</div>)} />
            </div>
        );
    }
    
    return (
		<>
			<Formik
				initialValues={initialParams}
                validationSchema = {formSchema}

				onSubmit={(params, {resetForm}) => {
                    //TODO send to the vaquen
                    if(params.annotationTime === 0){
                        delete params.annotationTime
                    }
                    //console.log('Data: ',params);
                    sendData('/api/user/invite', params);
					//resetForm();
					changeFormSend(true);
					setTimeout(() => changeFormSend(false), 5000);
				}}
			>
				{( {errors} ) => (
					<Form>  
                    <div role="group" aria-labelledby="checkbox-group">Role: 
                        {getRoles()}
                        <ErrorMessage name="role" component={() => (<div className="error">{errors.role}</div>)} />
                        {isAnnotator ? <TimeForm/> : null}
                    </div>         

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field id="email" type="email" name="email" placeholder='example@gmail.con'/>
                        <ErrorMessage name="email" component={() => (<div className="error">{errors.email}</div>)} />
                    </div>
   
						<button type="submit">Login</button>
						{formSend && <p className="exito">Video uploaded successfully!</p>}

					</Form>
				)}
			</Formik>
		</>
	);
}

export default InviteForm;