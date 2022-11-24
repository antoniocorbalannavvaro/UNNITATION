'use client'
import React, {useState} from 'react';
import { formatField, UniForm } from '../../../(components)/UniForm';
import UniCard from '../../../(components)/UniCard';

// Video URL
// Video transcript
// Video Creation
// Language
// Platform
// Actors yes no
// Sales meeting

export default function Page() {

    const [videoURL, setVideoURL] = useState('')
    const [transcriptURL, setTranscriptURL] = useState('')
    const [videoDate, setVideoDate] = useState('')
    const [language, setLanguage] = useState('')
    const [platform, setPlatform] = useState('')
    const [hasActors, setHasActors] = useState(false)

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <h1 className='my-5'>Upload video</h1>
                    <UniCard>
                        <UniForm
                            fields={[
                                formatField('text', 'Video URL', videoURL, setVideoURL),
                                formatField('text', 'Transcript URL', transcriptURL, setTranscriptURL),
                                formatField('date', 'Video Creation', videoDate, setVideoDate),
                                formatField('select', 'Language', language, setLanguage, {options: ['Yepa','yoka']}),
                                formatField('select', 'Platform', platform, setPlatform, {options: ['Yepa','yoka']}),
                                formatField('submit', 'Submit')
                            ]}
                        />
                    </UniCard> 
                </div>
            </div>
        </div>
    )
}