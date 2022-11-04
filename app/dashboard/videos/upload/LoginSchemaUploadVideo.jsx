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
    nAgents: '',
    nCustomers: '',
    customerNames: '',
    agentNames: ''
}

export const loginSchema = Yup.object().shape(
    {
        videoUrl: Yup.string()
                .url('URL invalid format')
                .required('URL is required.'),

        isTranscrypt: Yup.string()
                .required('Transcrypt is required.'),

        participants: Yup.number(),

        transcryptUrl: Yup.string()
                .url('URL invalid format'),

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
                .required('Video Creation Date is required.'),
        
        nAgents: Yup.number(),

        nCustomers: Yup.number(),

        customerNames: Yup.string(),

        agentNames: Yup.string()
    }
);

//Delete?
const checkForm = (param) => {
    const validation = Object.values(param).find((x) => x === 'null' || x === '');

    if(validation === 'null'){
        console.log(param);
        alert('Check it makina, there are some campos empty');
    }

    else {
        console.log('Vamooooos', param)
    }
}