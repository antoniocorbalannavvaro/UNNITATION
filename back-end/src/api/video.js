const express = require('express');
const AppUser = require('data-access-layer/app-user');
const Video = require('data-access-layer/video');
const { InvalidUserRoleError } = require('errors/app-user-error');
const { InvalidRequestError } = require('errors/request-error');
const checkLogin = require('api/middleware/check-login');

const router = express.Router();

router.use(checkLogin());

async function getAppUser(userId)
{
	const appUser = await AppUser.getById(userId);
	
	return {
		id: appUser.id,
		firstName: appUser.first_name,
		middleName: appUser.middle_name,
		lastName: appUser.last_name
	};
}

router.use(async (req, res, next) => {
	try
	{
		if (!(await AppUser.isAdministrator(req.appUser.id)) && !(await AppUser.isDataScientist(req.appUser.id)))
			throw new InvalidUserRoleError(req.appUser.id);
		
		next();
	}
	catch (err)
	{
		next(err);
	}
});

router.post('/upload', async (req, res, next) => {
	try
	{
		if (
			typeof req.body.name !== 'string' || 
			typeof req.body.url !== 'string' || 
			('transcriptUrl' in req.body && typeof req.body.transcriptUrl !== 'string') || 
			typeof req.body.salesMeeting !== 'boolean' || 
			typeof req.body.actorsInvolved !== 'boolean' || 
			typeof req.body.videoDate !== 'string' || 
			typeof req.body.platform !== 'string' || 
			typeof req.body.language !== 'string'
		)
			throw new InvalidRequestError(req);
		
		const videoDate = new Date(req.body.videoDate);
		
		/* TODO: get the actual video duration from the provided URL */
		const duration = '50 minutes 21 seconds 125 milliseconds';
		
		await Video.create(req.body.name, req.body.url, req.body.transcriptUrl, duration, req.body.salesMeeting, req.body.actorsInvolved, videoDate, req.body.platform, req.body.language, req.appUser.id);
		
		res.json({ error: false });
	}
	catch(err)
	{
		next(err);
	}
});

router.get('/list', async (req, res, next) => {
	/* TODO: accept filters */
	try
	{
		const videos = [];
		
		for (const videoId of await Video.getAllIds())
		{
			const video = await Video.getById(videoId);
			/* TODO: return the experiments (same as in /api/user/) */
			videos.push({
				id: video.id,
				name: video.name,
				url: video.url,
				transcriptUrl: video.transcript_url === null ? undefined : video.transcript_url,
				duration: video.duration,
				salesMeeting: video.sales_meeting,
				actorsInvolved: video.actors_involved,
				videoDate: video.video_date,
				uploadDate: video.upload_date,
				platform: video.platform,
				language: video.language,
				uploadedBy: await getAppUser(video.app_user_id)
			});
		}
		
		res.json(videos);
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;
