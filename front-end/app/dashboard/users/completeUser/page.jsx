'use client'

import React, {useState} from 'react';
import UniCard from '../../../(components)/UniCard';
import { formatField, UniForm } from '../../../(components)/UniForm';

/*
    Full name
    Birthday
    Gender
    Working Department
    Languages
    Submit
*/

const Page = () => {

    const [fullName, setFullName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [workingDepartment, setWorkingDepartment] = useState('')


    return (
        <UniCard>
            <UniForm 
                fields={[
                    formatField('text','Full name',fullName,setFullName),
                    formatField('date','Birthday',birthday,setBirthday),
                    formatField('date','Birthday',birthday,setBirthday),
                ]}
            />
        </UniCard>
    )

}


export default Page;