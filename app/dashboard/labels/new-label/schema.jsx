import * as Yup from 'yup';

export const initialParams = {
        labelName: '',
        labelColor: '',
        emoji: '',
        labelDescription: ''
}

export const schema = Yup.object().shape(
    {
        labelName: Yup.string()
                .required('Label Name is required.'),

        labelColor: Yup.string()
                .required('Color is required.'),

        emoji: Yup.string()
                .required('Emoji is required.'),

        labelDescription: Yup.string()
                .required('Description is required'),
    }
);