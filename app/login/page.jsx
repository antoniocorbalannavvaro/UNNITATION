'use client'
import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/router";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
    PageWrapper,
    Title,
    Label,
    Input,
    StyledInlineErrorMessage,
    Submit,
    CodeWrapper
  } from "./styles";

const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Email format invalid')
                .required('Email is required.'),

        password: Yup.string()
                .required('Password is required.')
    }
);

const validUsers = [
    {
        user1 : {email: 'antoniocn1996@gmail.com', password:'1234'}
    }
];

console.log('validUsers', validUsers[0].user1.email);

const LoginComponent = () => {

    const initialCredentials = {
        email: '',
        password: ''
    }

    return (
        <PageWrapper>
        <div>
            <Title></Title>
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
                        placeholder="example@gmail.com"/>
                    
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
                    <button onClick={() => console.log('email.value:',email.value,'\npassword.value:',password.value)}>check</button>
                    <button type="submit">Login</button>

                    {isSubmitting && 
                        (email.value === validUsers[0].user1.email) && 
                        (password.value === validUsers[0].user1.password) 
                                    ? console.log('bien')
                                    : null}
                </Form> 
            )}

            </Formik>
        </div>
        </PageWrapper>

    );
}

export default LoginComponent;