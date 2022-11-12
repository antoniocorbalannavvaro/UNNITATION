'use client'
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

const LabelSelector = () => (
  <div>
    <h1>Create Experiment</h1>
    <Formik
      initialValues={{ labels: [] }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ values }) => (
        <Form>
          <FieldArray
            name="labels"
            render={arrayHelpers => (
              <div>
                <h2>Labels:</h2>
                {values.labels && values.labels.length > 0 ? (
                  values.labels.map((friend, index) => (
                    <div key={index}>
                      <Field name={`labels.${index}`} as='select'>
                      <option value='null'>-</option>
                      <option value='Happyness'>Happyness</option>
                      <option value='Sadness'>Sadness</option>
                      <option value='Heresitation'>Heresitation</option>
                      <option value='Positive'>Positive</option>
                      <option value='Negative'>Negative</option>
                      <option value='Angry'>Angry</option>
                      </Field>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                        
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')}
                      >
                        +
                      </button>
                     
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    Add label
                  </button>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />
  </div>
);

export default LabelSelector;