import { Field, ErrorMessage } from 'formik';

export const TranscryptURLComp = () => {
    return (
        <div>
            <label htmlFor="transcryptUrl">Transcript URL:</label>
            <Field
                type="URL" 
                id="transcryptUrl" 
                name="transcryptUrl"/>
            <ErrorMessage name="transcryptUrl" component={() => (<div className="error"></div>)} />
        </div> 
    );
}