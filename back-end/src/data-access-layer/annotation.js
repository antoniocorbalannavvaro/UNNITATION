const database = require('./database');
const { NoCurrentExperimentAppUserError } = require('errors/app-user-error');

/* XXX: this only can be used within a transaction, hence the dbClient argument */
async function create(chunkUrl, startInterval, duration, videoId, experimentId, userId, dbClient)
{
	await dbClient.query(
		'INSERT INTO annotation(chunk_url, start_interval, duration, video_id, experiment_id, app_user_id) VALUES ($1, $2, $3, $4, $5, $6)',
		[ chunkUrl, startInterval, duration, videoId, experimentId, userId ]
	);
}

async function getCurrentByUserId(userId)
{
	const res = await database.query(
		'SELECT a.chunk_url, a.start_interval, EXTRACT(epoch FROM a.duration) AS duration, a.completed_date, a.video_id, a.experiment_id, a.app_user_id FROM annotation AS a JOIN experiment AS e ON e.id = a.experiment_id WHERE a.completed_date IS NULL AND e.aborted_date IS NULL AND a.app_user_id = $1 ORDER BY video_id ASC, start_interval ASC LIMIT 1',
		[ userId ]
	);
	
	if (res.rows.length === 0)
		throw new NoCurrentExperimentAppUserError(userId);
	
	return res.rows[0];
}

async function complete(userId)
{
	await database.query(
		'UPDATE annotation SET completed_date = (SELECT NOW()) WHERE (start_interval, video_id, experiment_id, app_user_id) IN (SELECT a.start_interval, a.video_id, a.experiment_id, a.app_user_id FROM annotation AS a JOIN experiment AS e ON e.id = a.experiment_id WHERE a.completed_date IS NULL AND e.aborted_date IS NULL AND a.app_user_id = $1 ORDER BY video_id ASC, start_interval ASC LIMIT 1)',
		[ userId ]
	);
}

module.exports = {
	create,
	getCurrentByUserId,
	complete
};
