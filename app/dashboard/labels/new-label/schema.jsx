import * as Yup from 'yup';

export const initialParams = {
        labelName: '',
}

export const schema = Yup.object().shape(
    {
        labelName: Yup.string()
                .required('Label Name is required.')
    }
);