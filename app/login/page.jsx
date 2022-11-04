'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape(
    {
        password: Yup.string()
                .required('Password is required.')
    }
);

const LoginForm = () => {
	const [formSend, changeFormSend] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					password: '',
					email: ''
				}}

                validationSchema = {loginSchema}

				validate={(params) => {
					let formErrors = {};

					// Validacion email
					if(!params.email){
						formErrors.email = 'Please, provide a email.'
					} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(params.email)){
						formErrors.email = 'Invalid email format.'
					}

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
							<label htmlFor="email">Email</label>
							<Field
								type="text" 
								id="email" 
								name="email" 
								placeholder="example@email.com" 
							/>
							<ErrorMessage name="email" component={() => (
                            <div className="error">{errors.email}</div>)} />
						</div>

                        <div>
							<label htmlFor="password">Password</label>
							<Field
								type="password" 
								id="password" 
								name="password" 
							/>
							<ErrorMessage name="password" component={() => (
                            <div className="error">{errors.password}</div>)} />
						</div>

						<button type="submit">Login</button>
                        
						{formSend && <p className="exito">Login successfully</p>}
					</Form>
				)}
			</Formik>
		</>
	);
}
 
export default LoginForm;