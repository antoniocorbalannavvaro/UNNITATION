const database = require('./database');

async function create(instant, startInterval, videoId, experimentId, appUserId, labelId)
{
	await database.query(
		'INSERT INTO annotation_event(instant, start_interval, video_id, experiment_id, app_user_id, label_id) VALUES ($1, $2, $3, $4, $5, $6)',
		[ instant, startInterval, videoId, experimentId, appUserId, labelId ]
	);
}

async function getAllByVideoId(videoId)
{
	const res = await database.query(
		'SELECT EXTRACT(epoch FROM (ae.start_interval + ae.instant)) AS instant, l.name AS label_name FROM annotation_event AS ae JOIN label AS l ON l.id = ae.label_id WHERE video_id = $1 ORDER BY instant ASC',
		[ videoId ]
	);
	
	return res.rows;
}

module.exports = {
	create,
	getAllByVideoId
};
