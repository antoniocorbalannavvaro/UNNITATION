import { Field, ErrorMessage, FieldArray } from 'formik';

export const TranscryptURLComp = () => {
    return (
        <div>
            <label htmlFor="transcryptUrl">Transcrypt URL:</label>
            <Field
                type="URL" 
                id="transcryptUrl" 
                name="transcryptUrl"/>
            <ErrorMessage name="transcryptUrl" component={() => (<div className="error"></div>)} />
        </div> 
    );
}

let contador = 1;


const CustomerNames = () => {
    return (
        <div>
            <label htmlFor="customerNames">Customer names:</label>
            <FieldArray type="text" id="customerNames" name="customerNames"/>

            <ErrorMessage name="customerNames"
            component={() => (<div className="error">{errors.videoUrl}</div>)} />
        </div>     
    );
}

const AgentNames = () => {
    return (
        <div>
            <label htmlFor="agentNames">Agent names:</label>
            <FieldArray type="text" id="agentNames" name="agentNames"/>

            <ErrorMessage name="agentNames"
            component={() => (<div className="error">{errors.videoUrl}</div>)} />
        </div>        
    );
}

export const SalesMeetingOptionalComp = () => {
    return (
        <div>
            <div>
                <label htmlFor="nAgents">Nº agents:</label>
                <Field id="nAgents" type="number" name="nAgents" placeholder='Add Number'/>
                <ErrorMessage name="nAgents" component={() => (<div className="error"></div>)} />
            </div>

            <div>
                <label htmlFor="nCustomers">Nº customers:</label>
                <Field id="nCustomers" type="number" name="nCustomers" placeholder='Add Number'/>
                <ErrorMessage name="nCustomers" component={() => (<div className="error"></div>)} />
            </div>
            <CustomerNames></CustomerNames>
            <AgentNames></AgentNames>
        </div>
    );
}