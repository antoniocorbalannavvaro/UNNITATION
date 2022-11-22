'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { schema, initialParams } from './schema';

const languages = ['english', 'spanish', 'german', 'french', 'chinese', 'russian', 'japanese'];
const departments = ['engineer','marketing','HHRR','data_science', 'manager'];

const showLanguagesSelect = () => {
    return languages.map((i) => {
        return <option value={i.toUpperCase()}>{i}</option>})
}

const showLanguagesCheckBox = () => {
    return languages.map((i) => {
        return <div><label> <Field type="checkbox" name="fluidLanguages" value={i.toString().toUpperCase()} /> {i} </label></div>
    })
}

const showDepartments = () => {
    return departments.map((i) => {
        return <option value={i.toString().toUpperCase()}>{i.replace('_',' ')}</option>
    })
}

const Page = () => {

	const [formSend, changeFormSend] = useState(false);

	return (
		<>
			<Formik
				initialValues={initialParams}
                validationSchema = {schema}

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
                        id="fullName" 
                        name="fullName" 
                        />
                        <ErrorMessage name="fullName" 
                        component={() => (<div className="error">{errors.fullName}</div>)} />
                    </div>    
      

                    <div>
                        <label htmlFor="age">Birthday:</label>
                        <Field id="age" type="date" name="age"/>
                        <ErrorMessage name="age" component={() => (<div className="error">{errors.age}</div>)} />
                    </div>

                    <div>
                        <label>Gender</label>
                        <Field name="gender" as="select">
                            <option value='null'>-</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </Field>
                        <ErrorMessage name="gender" component={() => (<div className="error">{errors.gender}</div>)} />
                    </div>

                    <div>
                        <label>Working Department</label>
                        <Field name="workingDepartment" as="select">
                            <option value="null">-</option>
                            {showDepartments()}
                        </Field>
                        <ErrorMessage name="workingDepartment" component={() => (<div className="error">{errors.workingDepartment}</div>)} />
                    </div>

                    <div>
                        <label>Native Language</label>
                        <Field name="nativeLanguage" as="select">
                            <option value='null'>-</option>
                            {showLanguagesSelect()}
                        </Field>
                        <ErrorMessage name="nativeLanguage" component={() => (<div className="error">{errors.nativeLanguage}</div>)} />
                    </div>

                    <div role="group" aria-labelledby="checkbox-group">Fluid languajes: 
                        {showLanguagesCheckBox()}
                        <ErrorMessage name="fluidLanguages" component={() => (<div className="error">{errors.fluidLanguages}</div>)} />
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