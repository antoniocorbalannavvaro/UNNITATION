import * as Yup from 'yup';

export const initialParams = {
    userEmail: '',
    role: '',
    weeklyGoal: 1
}

export const schema = Yup.object().shape(
    {
        userEmail: Yup.string()
                .required('Email is required.'),

        role: Yup.string()
                .required('Role is required.'),

        weeklyGoal: Yup.number()
                .positive()
                .min(1,'Weekly Goal must be a over 1.')
    }
);