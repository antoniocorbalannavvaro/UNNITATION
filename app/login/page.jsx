'use client'

import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Email format invalid')
                .required('Email is required.'),

        password: Yup.string()
                .required('Password is required.')
    }
);

const LoginComponent = () => {

    const initialCredentials = {
        email: '',
        password: ''
    }
    return (
        <div>
          <h4>Login</h4>
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
                    <label htmlFor="email">Email</label>
                    <Field 
                        id="email" 
                        type="email"    
                        name="email" 
                        placeholder="example@gmail.com" />
                    
                    {
                        errors.email && touched.email && 
                        (
                            <ErrorMessage name='email' component='div'></ErrorMessage>
                        )
                    }

                    <label htmlFor="password">Password</label>
                    <Field 
                        id="password" 
                        type='password' 
                        name="password" 
                        placeholder="password" />

                        {
                        errors.password && touched.password && 
                        (
                            <div>
                                <ErrorMessage name='password'></ErrorMessage>
                            </div>
                        )
                    }
                    
                    <button type="submit">Login</button>

                    {isSubmitting ? console.log('Submitin...') : null}
                </Form> 
            )}

            </Formik>
        </div>
    );
}

export default LoginComponent;