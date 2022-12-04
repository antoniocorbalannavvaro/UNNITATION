const { get, post } = require('./api');

async function main()
{
    async function makeAndInviteUsers(userEmail, userName){
		await get('/user/login', { email: 'andrea@hotmail.com', password: '123' });
		
        const userInvitation = await post('/user/invite', { email: userEmail, roles: [ 'ANNOTATOR' ], annotationDedicationTime: 20 });
        
        await get(userInvitation.invitationUrl);
        
	    await post('/user/accept', {
		    password: '1234',
		    firstName: userName,
		    middleName: 'Rodríguez',
		    lastName: 'Miñarro',
		    birthDate: '1998/08/11 17:35:13.133+2',
		    gender: 'NON_BINARY',
		    department: 'SALES',
		    mainLanguage: 'SPANISH',
		    secondaryLanguages: [ 'INDIAN', 'ENGLISH' ]
	    });
    }

	/* Login */
	await get('/user/login', { email: 'andrea@hotmail.com', password: '123' });
	
	/* Invite */
	const user1Invitation = await post('/user/invite', { email: 'ana@gmail.es', roles: [ 'ADMINISTRATOR', 'ANNOTATOR' ],  annotationDedicationTime: 20 });
	const user2Invitation = await post('/user/invite', { email: 'sandra@gmail.com', roles: [ 'ANNOTATOR', 'DATA_SCIENTIST' ], annotationDedicationTime: 20 });
	const user3Invitation = await post('/user/invite', { email: 'pedro@yahoo.com', roles: [ 'ANNOTATOR' ], annotationDedicationTime: 20 });
	const user4Invitation = await post('/user/invite', { email: 'diego@gmail.com', roles: [ 'ANNOTATOR' ], annotationDedicationTime: 20 });
    await makeAndInviteUsers('pablo@gmail.com', 'Pablo');
    await makeAndInviteUsers('juan@gmail.com', 'Juan');
    await makeAndInviteUsers('pepe@gmail.com', 'Pepe');
    await makeAndInviteUsers('victor@gmail.com', 'Victor');
    await makeAndInviteUsers('javier@gmail.com', 'Javier');
    await makeAndInviteUsers('sara@gmail.com', 'Sara');
    await makeAndInviteUsers('manuel@gmail.com', 'Manuel');
    
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
	
	
	await get(user4Invitation.invitationUrl);
	await post('/user/accept', {
		password: '321',
		firstName: 'Diego',
		middleName: 'Sanchez',
		lastName: 'Molina',
		birthDate: '1999/01/06 08:00:11.153+1',
		gender: 'MALE',
		department: 'SUPPORT',
		mainLanguage: 'SPANISH',
		secondaryLanguages: [ 'ENGLISH' ]
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
			labelIds: [ 1, 2, 3, 4 ],
			userIds: [ 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]
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
	
	for(let i = 0; i <= 1; i++){

	    /* Add annotation events */
	    await get('/user/login', { email: 'pedro@yahoo.com', password: 'pedro' });
	    const annotationEvents1 = [
		    { instant: 20.5, labelId: 1 },
		    { instant: 55.0, labelId: 3 },
		    { instant: 1200.0, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents1)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   
	    
	    //-----------------------------//
        await get('/user/login', { email: 'pablo@gmail.com', password: '1234' });
	    const annotationEvents2 = [
		    { instant: 24.5, labelId: 1 },
		    { instant: 59.0, labelId: 3 },
		    { instant: 1100.0, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents2)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   
	    
	    //-----------------------------//
        await get('/user/login', { email: 'juan@gmail.com', password: '1234' });
	    const annotationEvents3 = [
		    { instant: 30.5, labelId: 1 },
		    { instant: 60.0, labelId: 3 },
		    { instant: 1000.0, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents3)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   

	    
	    //-----------------------------//
        await get('/user/login', { email: 'pepe@gmail.com', password: '1234' });
	    const annotationEvents4 = [
		    { instant: 25.245, labelId: 1 },
		    { instant: 43.2130, labelId: 3 },
		    { instant: 1150.2340, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents4)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   

	    
	    //-----------------------------//
        await get('/user/login', { email: 'victor@gmail.com', password: '1234' });
	    const annotationEvents5 = [
		    { instant: 21.342, labelId: 1 },
		    { instant: 49.3240, labelId: 3 },
		    { instant: 990.4053, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents5)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   
	    
	    
	    //-----------------------------//
        await get('/user/login', { email: 'javier@gmail.com', password: '1234' });
	    const annotationEvents6 = [
		    { instant: 18.5, labelId: 1 },
		    { instant: 30.0, labelId: 3 },
		    { instant: 1130.421, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents6)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   
	    
	    //-----------------------------//
        await get('/user/login', { email: 'sara@gmail.com', password: '1234' });
	    const annotationEvents7 = [
		    { instant: 23.795, labelId: 1 },
		    { instant: 59.2340, labelId: 3 },
		    { instant: 1120.304, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents7)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   
	    
	    //-----------------------------//
        await get('/user/login', { email: 'manuel@gmail.com', password: '1234' });
	    const annotationEvents8 = [
		    { instant: 29.95, labelId: 1 },
		    { instant: 53.40434, labelId: 3 },
		    { instant: 1111.1, labelId: 2 }
	    ];
	    
	    for (const annotationEvent of annotationEvents8)
		    await post('/annotation/add-event', annotationEvent);
    
	    /* End some annotations */
	    await get('/annotation/end');   
    }
    
	await get('/user/login', { email: 'andrea@hotmail.com', password: '123' });
    await post('/video/list-annotations', { id: 2 });
    
    console.log('END');
}

main();
