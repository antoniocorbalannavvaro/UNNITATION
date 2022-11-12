'use client'
import React, {useState} from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { schema, initialParams } from './schema';

const Page = () => {

	const [formSend, changeFormSend] = useState(false);
    const [roleAnnotator, setRoleAnnotator] = useState(false);

	return (
		<>
			<Formik
				initialValues={initialParams}
                validationSchema = {schema}

				onSubmit={(params, {resetForm}) => {
                    //TODO send to the vaquen
                    console.log('Data: ',params);
					resetForm();
					changeFormSend(true);
					setTimeout(() => changeFormSend(false), 5000);
				}}
			>
				{( {errors} ) => (
					<Form>

                    <div>
                        <label htmlFor="userEmail">Email</label>
                        <Field
                        type="email"
                        id="userEmail" 
                        name="userEmail" 
                        />
                        <ErrorMessage name="userEmail" 
                        component={() => (<div className="error">{errors.userEmail}</div>)} />
                    </div>    
      
                    <div>
                        <label>Role</label>
                        <Field name="role" as="select">
                            <option onClick={() => setRoleAnnotator(false)} value='null'>-</option>
                            <option onClick={() => setRoleAnnotator(true)} value="annotator">Annotator</option>
                            <option onClick={() => setRoleAnnotator(false)} value="dataScientist">Data Scientist</option>
                            <option onClick={() => setRoleAnnotator(false)} value="admin">Admin</option>
                        </Field>
                        <ErrorMessage name="role" component={() => (<div className="error">{errors.role}</div>)} />
                        {roleAnnotator === true &&  
                        <div>
                            <label htmlFor="weeklyGoal">Weekly Goal:</label>
                            <Field id="weeklyGoal" type="number" name="weeklyGoal" placeholder='Add Number'/>
                            <ErrorMessage name="weeklyGoal" component={() => (<div className="error">{errors.weeklyGoal}</div>)} />
                        </div>}
                    </div>

                   



						<button type="submit">Send</button>
						{formSend && <p className="exito">Successfully!</p>}

					</Form>
				)}
			</Formik>
		</>
	);
}


export default Page;