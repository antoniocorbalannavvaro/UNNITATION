import * as Yup from 'yup';

export const initialParams = {
    fullName: '',
    age: '',
    gender: '',
    workingDepartment: '',
    firstLanguage: '',
    secondLanguage: '',
    proficiencySecondLanguaje: '',
}

export const userSchema = Yup.object().shape(
    {
        fullName: Yup.string()
                .required('Full name is required.'),

        age: Yup.number()
                .required('Age is required.'),

        gender: Yup.string()
                .required('Gender is required.'),

        workingDepartment: Yup.string()
                .required('Working Department is required.'),

        firstLanguage: Yup.string()
                .required('First Language is required.'),

        secondLanguage: Yup.string()
                .required('Second Language is required.'),
        
        proficiencySecondLanguaje: Yup.string()
                .required('Proficiency Second Languaje is required.'),


        
        

        
    }
);