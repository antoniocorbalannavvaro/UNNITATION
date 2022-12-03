const crypto = require('crypto');
const database = require('./database');
const Video = require('./video');
const AppUser = require('./app-user');
const Annotation = require('./annotation');
const { InvalidArgumentsExperimentError, ExperimentNotFoundError } = require('errors/experiment-error');
const { NoCurrentExperimentAppUserError, AlreadyInAExperimentError } = require('errors/app-user-error');

async function create(name, videoIds, labelIds, userIds, createdByUserId)
{
	if (videoIds.length < 1 || labelIds.length < 1 || userIds.length < 1)
		throw new InvalidArgumentsExperimentError('Too few videos or labels or users');
	
	const client = await database.connect();
	
	try
	{
		await client.query('BEGIN');
		
		/* Insert experiment */
		let res = await client.query(
			'INSERT INTO experiment(name, app_user_id) VALUES ($1, $2) RETURNING id',
			[name, createdByUserId]
		);
		
		const experimentId = res.rows[0].id;
		
		/* Insert videos */
		for (const videoId of videoIds)
		{
			await client.query(
				'INSERT INTO video_experiment(video_id, experiment_id) VALUES ($1, $2)',
				[ videoId, experimentId ]
			);
		}
		
		/* Insert labels */
		for (const labelId of labelIds)
		{
			await client.query(
				'INSERT INTO experiment_label(experiment_id, label_id) VALUES ($1, $2)',
				[ experimentId, labelId ]
			);
		}
		
		/* Insert users (participants) */
		for (const userId of userIds)
		{
			if ((await AppUser.getById(userId)).completed_date === null)
				throw new InvalidArgumentsExperimentError(`user ${userId} profile is not completed`);
			
			if (!(await AppUser.isAnnotator(userId)))
				throw new InvalidArgumentsExperimentError(`user ${userId} is not an annotator`);
			
			await AppUser.getCurrentExperimentId(userId).then((experimentId) => {
				throw new AlreadyInAExperimentError(userId, experimentId);
			}).catch((err) => {
				if (!(err instanceof NoCurrentExperimentAppUserError))
					throw err;
			});
			
			await client.query(
				'INSERT INTO experiment_app_user(experiment_id, app_user_id) VALUES ($1, $2)',
				[ experimentId, userId ]
			);
		}
		
		/* Create the (empty annotations) for each video for each user */
		for (const videoId of videoIds)
		{
			const videoDuration = await Video.getDurationInSeconds(videoId);
			
			for (const userId of userIds)
			{
				const chunkDuration = (await AppUser.getById(userId)).annotation_dedication_time * 60;
				
				for (let startInterval = 0; startInterval < videoDuration; startInterval += chunkDuration)
				{
					/* TODO: partition the video in chunks and generate a url */
					const chunkUrl = `/api/videos/${crypto.randomBytes(16).toString('hex')}.mp4`;
					await Annotation.create(chunkUrl, startInterval, chunkDuration, videoId, experimentId, userId, client);
				}
			}
		}
		
		await client.query('COMMIT');
	}
	catch (err)
	{
		await client.query('ROLLBACK');
		throw err;
	}
	finally
	{
		client.release();
	}
}

async function abort(id)
{
	const res = await database.query(
		'UPDATE experiment SET aborted_date = (SELECT NOW()) WHERE id = $1 RETURNING id',
		[ id ]
	);
	
	if (res.rows.length === 0)
		throw new ExperimentNotFoundError(id);
}

async function getAllIds()
{
	const res = await database.query('SELECT id, name, app_user_id FROM experiment');
	
	const ids = [];
	
	for (const { id } of res.rows)
		ids.push(id);
	
	return ids;
}

async function getById(id)
{
	const res = await database.query(
		'SELECT id, name, aborted_date, app_user_id FROM experiment WHERE id = $1',
		[ id ]
	);
	
	if (res.rows.length === 0)
		throw new ExperimentNotFoundError(id);
	
	return res.rows[0];
}

async function getVideoIds(id)
{
	const res = await database.query(
		'SELECT video_id FROM video_experiment WHERE experiment_id = $1',
		[ id ]
	);
	
	const videos = [];
	
	for (const { video_id } of res.rows)
		videos.push(video_id);
	
	return videos;
}

async function getLabelIds(id)
{
	const res = await database.query(
		'SELECT label_id FROM experiment_label WHERE experiment_id = $1',
		[ id ]
	);
	
	const labels = [];
	
	for (const { label_id } of res.rows)
		labels.push(label_id);
	
	return labels;
}

async function getUserIds(id)
{
	const res = await database.query(
		'SELECT app_user_id FROM experiment_app_user WHERE experiment_id = $1',
		[ id ]
	);
	
	const users = [];
	
	for (const { app_user_id } of res.rows)
		users.push(app_user_id);
	
	return users;
}

async function hasLabelId(experimentId, labelId)
{
	const res = await database.query(
		'SELECT label_id FROM experiment_label WHERE experiment_id = $1 AND label_id = $2',
		[ experimentId, labelId ]
	);
	
	if (res.rows.length === 0)
		return false;
	
	return true;
}

module.exports = {
	create,
	abort,
	getAllIds,
	getById,
	getVideoIds,
	getLabelIds,
	getUserIds,
	hasLabelId
};
