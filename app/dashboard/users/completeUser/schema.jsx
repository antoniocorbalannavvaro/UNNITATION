import * as Yup from 'yup';

export const initialParams = {
    fullName: '',
    age: new Date(),
    gender: '',
    workingDepartment: '',
    nativeLanguage: '',
    fluidLanguages: [],
}

export const schema = Yup.object().shape(
    {
        fullName: Yup.string()
                .required('Full Name is required.'),

        age: Yup.date()
                .required('Birthday is required.'),

        gender: Yup.string()
                .required('Gender is required'),

        workingDepartment: Yup.string()
                .required('Working Department is required.'),

        nativeLanguage: Yup.string()
                .required('Native Language is required.'),

        fluidLanguages: Yup.array(),

    }
);