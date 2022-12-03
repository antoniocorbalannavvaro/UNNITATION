import * as Yup from 'yup';

export const initialParams = {
        experimentVideo: '',
        experimentLabel: '',
        experimentAnnotator: '',
}

export const schema = Yup.object().shape(
    {
        experimentVideo: Yup.string()
                .required('Video is required.'),

        experimentLabel: Yup.string()
                .required('Label is required.'),

        experimentAnnotator: Yup.string()
                .required('Annotators are required')
    }
);