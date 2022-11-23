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
    videoCreationDate: '',
    dateUploaded: '',
}

export const loginSchema = Yup.object().shape(
    {
        videoUrl: Yup.string()
                .url('URL invalid format')
                .required('URL is required.'),

        isTranscrypt: Yup.bool()
                .required('Transcript is required.'),

        participants: Yup.number()
                .min(1)
                .positive('Participants must be a positive number')
                .required('Participants number is required'),

        transcryptUrl: Yup.string()
                .url('URL invalid format'),

        salesMeeting: Yup.bool()
                .required('Sales Meeting is required.'),

        actors: Yup.bool()
                .required('Actors are required.'),


        language: Yup.string()
                .required('Language is required.'),

        platform: Yup.string()
                .required('Platform is required.'),

        videoCreationDate: Yup.date()
                .required('Video Creation Date is required.'),
        
        dateUploaded: Yup.date()
    }
);