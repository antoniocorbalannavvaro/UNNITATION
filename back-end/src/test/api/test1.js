const { get, post } = require('./api');

async function main()
{
	/* Login */
	await get('/user/login', { email: 'andrea@hotmail.com', password: '123' });
	
	/* Invite */
	const user1Invitation = await post('/user/invite', { email: 'ana@gmail.es', roles: [ 'ADMINISTRATOR' ] });
	const user2Invitation = await post('/user/invite', { email: 'sandra@gmail.com', roles: [ 'ANNOTATOR', 'DATA_SCIENTIST' ], annotationDedicationTime: 5 });
	const user3Invitation = await post('/user/invite', { email: 'pedro@yahoo.com', roles: [ 'ANNOTATOR' ], annotationDedicationTime: 20 });
	await post('/user/invite', { email: 'diego@gmail.com', roles: [ 'DATA_SCIENTIST' ] });
	
	/* Accept */
	await get(user1Invitation.invitationUrl);
	await post('/user/accept', {
		password: '1234',
		firstName: 'Ana',
		middleName: 'Rodríguez',
		lastName: 'Miñarro',
		birthDate: '1998/08/11 17:35:13.133+2',
		gender: 'NON_BINARY',
		department: 'SALES',
		mainLanguage: 'CHINESE',
		secondaryLanguages: [ 'INDIAN', 'SPANISH' ]
	});
	
	await get(user3Invitation.invitationUrl);
	await post('/user/accept', {
		password: 'pedro',
		firstName: 'Pedro',
		middleName: 'Simón',
		lastName: 'García',
		birthDate: '1992/10/22 03:11:18.562+5',
		gender: 'MALE',
		department: 'SUPPORT',
		mainLanguage: 'ENGLISH',
		secondaryLanguages: [ 'SPANISH' ]
	});
	
	await get(user2Invitation.invitationUrl);
	await post('/user/accept', {
		password: 'sss',
		firstName: 'Sandra',
		middleName: 'Valera',
		lastName: 'Jiménez',
		birthDate: '1999/01/06 08:00:11.153+1',
		gender: 'TRANS',
		department: 'CALL_CENTER',
		mainLanguage: 'INDIAN',
		secondaryLanguages: [ 'ENGLISH', 'CHINESE' ]
	});
	
	/* Login again */
	await get('/user/login', { email: 'ana@gmail.es', password: '1234' });
	
	/* Info */
	await get('/user/info');
	await get('/user/info', { userId: 4 });
	
	/* List */
	await get('/user/list');
	
	/* Login again */
	await get('/user/login', { email: 'andrea@hotmail.com', password: '123' });
	
	/* Create labels */
	const labels = [
		{ name: 'sad', emojiUnicode: 'A' },
		{ name: 'mad', emojiUnicode: 'B' },
		{ name: 'happy', emojiUnicode: 'C' },
		{ name: 'annoyed', emojiUnicode: 'D' }
	];
	
	for (const label of labels)
		await post('/label/create', label);
	
	await get('/label/list');
	
	/* Upload videos */
	const videos1 = [
		{
			name: 'IBM tech meeting 1',
			url: 'https://youtube.com/ibm-tech-meeting-1.mp4',
			transcriptUrl: 'https://google.com/transcript/ibm-1.txt',
			salesMeeting: false,
			actorsInvolved: true,
			videoDate: '2015/04/11 17:32:15.501+2',
			platform: 'MICROSOFT_TEAMS',
			language: 'INDIAN'
		}, {
			name: 'Google sales meeting 1',
			url: 'https://youtube.com/google-sales-meeting-1.mp4',
			transcriptUrl: 'https://google.com/transcript/google-1.txt',
			salesMeeting: true,
			actorsInvolved: false,
			videoDate: '2018/03/15 21:12:04.661+1',
			platform: 'GOOGLE_MEET',
			language: 'ENGLISH'
		}, {
			name: 'ARM new core presentation rehearsal',
			url: 'https://youtube.com/arm-rehearsal.mp4',
			salesMeeting: false,
			actorsInvolved: false,
			videoDate: '2017/08/12 09:30:01.124+3',
			platform: 'ZOOM',
			language: 'CHINESE'
		}
	];
	
	for (const video of videos1)
		await post('/video/upload', video);
	
	/* Login again */
	await get('/user/login', { email: 'ana@gmail.es', password: '1234' });
	
	const videos2 = [
		{
			name: 'IBM tech meeting 2',
			url: 'https://youtube.com/ibm-tech-meeting-2.mp4',
			transcriptUrl: 'https://google.com/transcript/ibm-2.txt',
			salesMeeting: false,
			actorsInvolved: true,
			videoDate: '2015/05/10 15:30:00.031+1',
			platform: 'ZOOM',
			language: 'SPANISH'
		}, {
			name: 'Google sales meeting 2',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
			salesMeeting: true,
			actorsInvolved: true,
			videoDate: '2018/04/22 20:00:00.500+1',
			platform: 'MICROSOFT_TEAMS',
			language: 'ENGLISH'
		}
	];
	
	for (const video of videos2)
		await post('/video/upload', video);
	
	/* Login again */
	await get('/user/login', { email: 'andrea@hotmail.com', password: '123' });
	
	await get('/video/list');
	
	/* Create experiments */
	const experiments1 = [
		{
			name: 'Experiment test 1',
			chunkTime: 600,
			videoIds: [ 1, 2, 4 ],
			labelIds: [ 1, 3 ],
			userIds: [ 4 ]
		}, {
			name: 'Experiment test 2',
			chunkTime: 300,
			videoIds: [ 2, 3 ],
			labelIds: [ 2, 4 ],
			userIds: [ 3 ]
		}
	];
	
	for (const experiment of experiments1)
		await post('/experiment/create', experiment);
	
	/* List experiments */
	await get('/experiment/list');
	
	/* Abort experiment */
	await get('/experiment/abort', { id: 1 });
	
	await post('/experiment/create', {
		name: 'Experiment test 3',
		chunkTime: 300,
		videoIds: [ 2, 3 ],
		labelIds: [ 1, 2, 3 ],
		userIds: [ 4 ]
	});
	
	/* Get info of the current annotations (per user) */
	await get('/user/login', { email: 'pedro@yahoo.com', password: 'pedro' });
	await get('/annotation/info');
	await get('/user/login', { email: 'sandra@gmail.com', password: 'sss' });
	await get('/annotation/info');
	
	/* Add annotation events */
	await get('/user/login', { email: 'pedro@yahoo.com', password: 'pedro' });
	const annotationEvents = [
		{ instant: 20.5, labelId: 1 },
		{ instant: 55.0, labelId: 3 },
		{ instant: 1200.0, labelId: 2 }
	];
	
	for (const annotationEvent of annotationEvents)
		await post('/annotation/add-event', annotationEvent);
	
	/* End some annotations */
	for (let i = 0; i < 4; i++)
		await get('/annotation/end');
}

main();
