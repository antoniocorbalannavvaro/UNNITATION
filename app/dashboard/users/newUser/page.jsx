'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {initialParams, userSchema} from './userSchema';

const UserForm = () => {

    return (
		<>
			<Formik
				initialValues={initialParams}
                validationSchema = {userSchema}

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
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        />
                        <ErrorMessage name="fullName" 
                        component={() => (<div className="error">{errors.fullName}</div>)} />
                    </div>    

                    <div>
                        <label htmlFor="age">Age</label>
                        <Field id="age" type="number" name="age" placeholder='Add Number'/>
                        <ErrorMessage name="age" component={() => (<div className="error">{errors.age}</div>)} />
                    </div>

					</Form>
				)}
			</Formik>
		</>
    );
}

export default UserForm;