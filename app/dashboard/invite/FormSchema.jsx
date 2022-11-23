import * as Yup from 'yup';

export const initialParams = {
        email:'',
        role:'',
        annotationTime: 0   
}

export const formSchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Email invalid format')
                .required('Email is required.'),
        
        role: Yup.array()
                .required('Role is required'),

        annotationTime: Yup.number('Annotation time must be a number')
                .positive('Annotation time must be a positive number.')
                .min(0)
                .required('Annotation time is required')
    }
);