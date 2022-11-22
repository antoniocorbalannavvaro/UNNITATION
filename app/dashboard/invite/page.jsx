'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formSchema, initialParams } from './FormSchema';

/* fetch('/api/user/invite', {
	method: 'POST',
	body: JSON.stringify(params),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});
 */

const TimeForm = () => {
    return (
        <div>
            <label htmlFor="annotationTime">Annotation Time:</label>
            <Field id="annotationTime" type="number" name="annotationTime"/>
            <ErrorMessage name="annotationTime" component={() => (<div className="error">Annotation Time is Required</div>)} />
        </div>
    );
}


const InviteForm = () => {

    const [formSend, changeFormSend] = useState(false);
    const [isAnnotator, setIsAnnotator] = useState(false);

    const changeAnnotatorState = (value) => {
        setIsAnnotator(!isAnnotator);
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
                    
                    console.log('Data: ',params);
					//resetForm();
					changeFormSend(true);
					setTimeout(() => changeFormSend(false), 5000);
				}}
			>
				{( {errors} ) => (
					<Form>     

                    <div role="group" aria-labelledby="checkbox-group">Role: 
                        <label>
                            <Field type="checkbox" name="role" value="ADMIN" />
                            Admin
                        </label>

                        <label>
                            <Field type="checkbox" name="role" value="DATA_SCIENTIST" />
                            Data Scientist
                        </label>

                        <label>
                            <Field onClick={() => changeAnnotatorState(false)} type="checkbox" name="role" value="ANNOTATOR" />
                            Annotator
                        </label>
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