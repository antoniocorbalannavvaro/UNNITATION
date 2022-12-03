const express = require('express');
const checkLogin = require('api/middleware/check-login')
const AppUser = require('data-access-layer/app-user');
const Annotation = require('data-access-layer/annotation');
const AnnotationEvent = require('data-access-layer/annotation-event');
const Experiment = require('data-access-layer/experiment');
const Label = require('data-access-layer/label');
const { InvalidUserRoleError } = require('errors/app-user-error');
const { InvalidRequestError } = require('errors/request-error');
const { InvalidInstantAnnotationEventError, InvalidLabelAnnotationEventError } = require('errors/annotation-event-error');

const router = express.Router();

router.use(checkLogin());

router.use(async (req, res, next) => {
	try
	{
		if (!(await AppUser.isAnnotator(req.appUser.id)))
			throw new InvalidUserRoleError(req.appUser.id);
		
		next();
	}
	catch (err)
	{
		next(err);
	}
});

router.get('/info', async (req, res, next) => {
	try
	{
		const currentAnnotation = await Annotation.getCurrentByUserId(req.appUser.id);
		
		const labels = [];
		
		for (const labelId of await Experiment.getLabelIds(currentAnnotation.experiment_id))
		{
			const label = await Label.getById(labelId);
			labels.push({
				id: label.id,
				name: label.name,
				emojiUnicode: label.emoji_unicode,
			});
		}
		
		res.json({
			video: {
				url: currentAnnotation.chunk_url,
				duration: currentAnnotation.duration
			},
			labels: labels
		});
	}
	catch (err)
	{
		next(err);
	}
});

router.get('/start', (req, res) => {
	/* This does nothing at all */
	res.json({ error: false });
});

router.post('/add-event', async (req, res, next) => {
	try
	{
		if (typeof req.body.instant !== 'number' || typeof req.body.labelId !== 'number')
			throw InvalidRequestError(req);
		
		const currentAnnotation = await Annotation.getCurrentByUserId(req.appUser.id);
		
		if (req.body.instant > currentAnnotation.duration)
			throw new InvalidInstantAnnotationEventError(req.body.instant, currentAnnotation.duration);
		
		/* TODO: don't allow the user to put annotations before the last annotation event */
		
		if (!(await Experiment.hasLabelId(currentAnnotation.experiment_id, req.body.labelId)))
			throw new InvalidLabelAnnotationEventError(currentAnnotation.experiment_id, req.body.labelId);
		
		await AnnotationEvent.create(
			req.body.instant,
			currentAnnotation.start_interval,
			currentAnnotation.video_id,
			currentAnnotation.experiment_id,
			req.appUser.id,
			req.body.labelId
		);
		
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

router.get('/end', async (req, res, next) => {
	try
	{
		await Annotation.complete(req.appUser.id);
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;
