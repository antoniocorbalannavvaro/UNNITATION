import { Field, ErrorMessage } from 'formik';

export const VideoUrlComp = () => {
    return (
    <div>
        <label htmlFor="videoUrl">Video URL</label>
        <Field
        type="URL" 
        id="videoUrl" 
        name="videoUrl" 
        />
        <ErrorMessage name="videoUrl" 
        component={() => (<div className="error">{errors.videoUrl}</div>)} />
    </div>
    );
};


export const ParticipantsComp = () => {
    return (
        <div>
            <label htmlFor="participants">Nº Participants:</label>
            <Field id="participants" type="number" name="participants" placeholder='Add Number'/>
            <ErrorMessage name="participants" component={() => (<div className="error">{errors.participants}</div>)} />
        </div>
    );
}

export const VideoCreationDateComp = () => {
    return (
        <div>
            <label htmlFor="videoCreationDate">Video Creation:</label>
            <Field id="videoCreationDate" type="date" name="videoCreationDate"/>
            <ErrorMessage name="videoCreationDate" component={() => (<div className="error">{errors.videoCreationDate}</div>)} />
        </div>
    );
}


export const LanguageComp = () => {
    return (
        <div>
            <label>Language</label>
            <Field name="language" as="select">
                <option value='null'>-</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="german">German</option>
                <option value="french">French</option>
                <option value="chinese">Chinese</option>
                <option value="russian">Russian</option>
            </Field>
            <ErrorMessage name="language" component={() => (<div className="error">{errors.language}</div>)} />
        </div>
    );
}

export const PlatformComp = () => {
    return (
        <div>
        <label>Platform</label>
        <Field name="platform" as="select">
            <option value="null">-</option>
            <option value="zoom">Zoom</option>
            <option value="meet">Meet</option>
            <option value="team">Team</option>
        </Field>
        <ErrorMessage name="platform" component={() => (<div className="error">{errors.platform}</div>)} />
        </div>

    );
}

export const DealComp = () => {
    return (
        <div>
        <label>Deal Predisposition</label>
        <Field name="dealDisposition" as="select">
            <option value="null">-</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
        </Field>
        <ErrorMessage name="dealDisposition" component={() => (<div className="error">{errors.dealDisposition}</div>)} />
        </div>
    );
}

export const ActorsComp = () => {
    return (
        <div>
        <label>Actors?</label>
        <label>
            <Field type="radio" name="actors" value="true" /> Yes
        </label>
        <label>
            <Field type="radio" name="actors" value="false" /> No
        </label>
        <ErrorMessage name="actors" component={() => (<div className="error">{errors.actors}</div>)} />
    </div>
    );
}

export const SalesMeetingComp = () => {
    return (
        <div>
            <label>Sales Meeting?</label>
            <label>
                <Field type="radio" name="salesMeeting" value="true" /> Yes
            </label>
            <label>
                <Field type="radio" name="salesMeeting" value="false" /> No
            </label>
            <ErrorMessage name="salesMeeting" component={() => (<div className="error">{errors.salesMeeting}</div>)} />
        </div>
    );
}

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