const express = require('express');
const AppUser = require('data-access-layer/app-user');
const Video = require('data-access-layer/video');
const Label = require('data-access-layer/label');
const Experiment = require('data-access-layer/experiment');
const checkLogin = require('api/middleware/check-login');
const { InvalidRequestError } = require('errors/request-error');
const { InvalidUserRoleError } = require('errors/app-user-error');

const router = express.Router();

async function getAppUser(id)
{
	const appUser = await AppUser.getById(id);
	return {
		id: appUser.id,
		firstName: appUser.first_name,
		middleName: appUser.middle_name,
		lastName: appUser.last_name
	};
}

async function getExperiment(experimentId)
{
	/* Get video info */
	const videos = [];
	for (const id of await Experiment.getVideoIds(experimentId))
	{
		const video = await Video.getById(id);
		videos.push({
			id: video.id,
			name: video.name
		});
	}
	
	const labels = [];
	for (const id of await Experiment.getLabelIds(experimentId))
	{
		const label = await Label.getById(id);
		labels.push({
			name: label.name,
			emojiUnicode: label.emoji_unicode
		});
	}
	
	const users = [];
	for (const id of await Experiment.getUserIds(experimentId))
		users.push(await getAppUser(id));
	
	const experiment = await Experiment.getById(experimentId);
	
	return {
		id: experiment.id,
		name: experiment.name,
		abortedDate: experiment.aborted_date === null ? undefined : experiment.aborted_date,
		createdBy: await getAppUser(experiment.app_user_id),
		videos: videos,
		labels: labels,
		users: users
	};
}

router.use(checkLogin());

router.use(async (req, res, next) => {
	try
	{
		if (!(await AppUser.isAdministrator(req.appUser.id)))
			throw new InvalidUserRoleError(req.appUser.id);
		
		next();
	}
	catch (err)
	{
		next(err);
	}
});

router.post('/create', async (req, res, next) => {
	try
	{
		if (typeof req.body.name !== 'string')
			throw new InvalidRequestError(req);
		
		const arrayNames = [ 'videoIds', 'labelIds', 'userIds' ];
		
		for (const arrayName of arrayNames)
		{
			if (!(req.body[arrayName] instanceof Array))
				throw new InvalidRequestError(req);
			
			for (const videoId of req.body[arrayName])
				if (typeof videoId !== 'number')
					throw new InvalidRequestError(req);
		}
		
		await Experiment.create(req.body.name, req.body.videoIds, req.body.labelIds, req.body.userIds, req.appUser.id);
		
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

router.get('/abort', async (req, res, next) => {
	try
	{
		if (!('id' in req.query) || !/^[0-9]+$/.test(req.query.id))
			throw new InvalidRequestError(req);
		
		const experimentId = parseInt(req.query.id);
		
		if (isNaN(experimentId))
			throw new InvalidRequestError(req);
		
		await Experiment.abort(experimentId);
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

router.get('/list', async (req, res, next) => {
	try
	{
		const experiments = [];
		
		for (const experimentId of await Experiment.getAllIds())
			experiments.push(await getExperiment(experimentId));
		
		res.json(experiments);
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;
