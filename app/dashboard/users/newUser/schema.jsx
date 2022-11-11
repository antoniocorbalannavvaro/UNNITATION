import * as Yup from 'yup';

export const initialParams = {
    fullName: '',
    age: '',
    gender: '',
    workingDepartment: '',
    firstLanguage: '',
    secondLanguage: '',
    proficiencySecondLanguage: ''
}

export const loginSchema = Yup.object().shape(
    {
        fullName: Yup.string()
                .required('Full Name is required.'),

        age: Yup.number()
                .required('Age is required.'),

        gender: Yup.string()
                .required('Gender is required'),

        workingDepartment: Yup.string()
                .required('Working Department is required.'),

        firstLanguage: Yup.string()
                .required('First Language is required.'),

        secondLanguage: Yup.string()
                .required('Second Language is required.'),

        proficiencySecondLanguage: Yup.string()
                .required('Required.'),
    }
);