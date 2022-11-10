import * as Yup from 'yup';

export const initialParams = {
    videoUrl: '',
    isTranscrypt: '',
    transcryptUrl: '',
    salesMeeting: '',
    actors: '',
    participants: '',
    language: '',
    platform: '',
    dealDisposition: '',
    videoCreationDate: '',
}

export const loginSchema = Yup.object().shape(
    {
        videoUrl: Yup.string()
                .url('URL invalid format')
                .required('URL is required.'),

        isTranscrypt: Yup.string()
                .required('Transcript is required.'),

        participants: Yup.number()
                .required('Participants number is required'),

        transcryptUrl: Yup.string()
                .url('URL invalid format')
                .required('URL Transcript is required'),

        salesMeeting: Yup.string()
                .required('Sales Meeting is required.'),

        actors: Yup.string()
                .required('Actors are required.'),


        language: Yup.string()
                .required('Language is required.'),

        platform: Yup.string()
                .required('Platform is required.'),

        dealDisposition: Yup.string()
                .required('Deal Disposition is required.'),

        videoCreationDate: Yup.date()
                .required('Video Creation Date is required.')
    }
);