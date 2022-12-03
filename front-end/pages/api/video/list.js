/* TDOO */

const dummyVideos = [
	{
		name: 'IBM tech meeting',
		url: 'https://amazon.com/s3/videos/1234567890',
		transcriptUrl: 'https://amazon.com/s3/videos/0987654321',
		salesMeeting: false,
		actorsInvolved: false,
		videoDate: new Date(),
		uploadDate: new Date(),
		platform: 'GOOGLE_MEET',
		language: 'INDIAN'
	},
	{
		name: 'Intel sales meeting',
		url: 'https://amazon.com/s3/videos/1234567890',
		transcriptUrl: 'https://amazon.com/s3/videos/0987654321',
		salesMeeting: true,
		actorsInvolved: true,
		videoDate: new Date(),
		uploadDate: new Date(),
		platform: 'MICROSOFT_TEAMS',
		language: 'CHINESE'
	},
	{
		name: 'Google API improvement discussion',
		url: 'https://amazon.com/s3/videos/1234567890',
		transcriptUrl: 'https://amazon.com/s3/videos/0987654321',
		salesMeeting: false,
		actorsInvolved: false,
		videoDate: new Date(),
		uploadDate: new Date(),
		platform: 'ZOOM',
		language: 'ENGLISH'
	}
];

export default async (req, res) => {
	res.json(dummyVideos);
};
