const database = require('./database');

async function create(instant, startInterval, videoId, experimentId, appUserId, labelId)
{
	await database.query(
		'INSERT INTO annotation_event(instant, start_interval, video_id, experiment_id, app_user_id, label_id) VALUES ($1, $2, $3, $4, $5, $6)',
		[ instant, startInterval, videoId, experimentId, appUserId, labelId ]
	);
}

module.exports = {
	create
};
