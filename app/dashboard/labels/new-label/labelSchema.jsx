import * as Yup from 'yup';

export const initialParams = {
        labelName: '',
        color: '',
        emoji: '',
        description: ''
}

export const loginSchema = Yup.object().shape(
    {
        labelName: Yup.string()
                .required('Label Name is required.'),

        color: Yup.string()
                .required('Color is required.'),

        emoji: Yup.string()
                .required('Emoji is required.'),

        description: Yup.string()
                .required('Description is required'),
    }
);