'use client'
import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { schema, initialParams } from './schema';
import getData from '../../labels/fetch.enum.module';

const departments = await getData('department');
const languages = await getData('language_enum');
const sex = await getData('gender');

const showLanguagesSelect = () => {
    return languages.map((i) => {
        return <option value={i}> {i.replace('_',' ').toLowerCase()} </option>})
}

const showLanguagesCheckBox = () => {
    return languages.map((i) => {
        return <div><label> <Field type="checkbox" name="fluidLanguages" value={i.toString()} /> {i.replace('_',' ').toLowerCase()} </label></div>
    })
}

const showDepartments = () => {
    return departments.map((i) => {
        return <option value={i}>{i.replace('_',' ').toLowerCase()}</option>
    })
}

const showSex = () => {
    return sex.map((i) => {
        return <option value={i}>{i.replace('_',' ').toLowerCase()}</option>})
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
                    if(params.fluidLanguages.length === 0){
                        delete params.fluidLanguages;
                    }
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
                        <label htmlFor="age">Birthday</label>
                        <Field id="age" type="date" name="age"/>
                        <ErrorMessage name="age" component={() => (<div className="error">{errors.age}</div>)} />
                    </div>

                    <div>
                        <label>Gender</label>
                        <Field name="gender" as="select">
                            <option value=''>-</option>
                            {showSex()}
                        </Field>
                        <ErrorMessage name="gender" component={() => (<div className="error">{errors.gender}</div>)} />
                    </div>

                    <div>
                        <label>Working Department</label>
                        <Field name="workingDepartment" as="select">
                            <option value="">-</option>
                            {showDepartments()}
                        </Field>
                        <ErrorMessage name="workingDepartment" component={() => (<div className="error">{errors.workingDepartment}</div>)} />
                    </div>

                    <div>
                        <label>Native Language</label>
                        <Field name="nativeLanguage" as="select">
                            <option value=''>-</option>
                            {showLanguagesSelect()}
                        </Field>
                        <ErrorMessage name="nativeLanguage" component={() => (<div className="error">{errors.nativeLanguage}</div>)} />
                    </div>

                    <div role="group" aria-labelledby="checkbox-group">Fluid languajes
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