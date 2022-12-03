'use client'

import {useState} from 'react';
import UniCard from '../../../(components)/UniCard';
import { formatField, UniForm } from '../../../(components)/UniForm';

const Page = () => {

	const [labelName, setLabelName] = useState('')
	const [emoji, setEmoji] = useState('')

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-6 mt-5">
					<h1 className='my-3'>Add Label</h1>
					<UniCard>
						<UniForm 
							fields={[
								formatField('text', 'Label Name', labelName, setLabelName ),
								formatField('emoji', 'Emoji: ', emoji, setEmoji ),
								formatField('submit', 'Submit' )
							]}
						/>
					</UniCard>
				</div>
			</div>
		</div>
	)

}
 
export default Page;