const database = require('./database');
const { VideoIdDoesNotExistsError } = require('errors/video-error');

async function create(name, url, transcriptUrl, duration, salesMeeting, actorsInvolved, videoDate, platform, language, userId)
{
	await database.query(
		'INSERT INTO video(name, url, transcript_url, duration, sales_meeting, actors_involved, video_date, upload_date, platform, language, app_user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, (SELECT NOW()), $8, $9, $10)',
		[ name, url, transcriptUrl, duration, salesMeeting, actorsInvolved, videoDate, platform, language, userId ]
	);
}

async function getDurationInSeconds(id)
{
	const res = await database.query('SELECT EXTRACT(epoch FROM duration) AS duration FROM video WHERE id = $1', [ id ]);
	
	if (res.rows.length === 0)
		throw new VideoIdDoesNotExistsError(id);
	
	return res.rows[0].duration;
}

async function getAllIds()
{
	const res = await database.query('SELECT id FROM video');
	
	const ids = [];
	for (const { id } of res.rows)
		ids.push(id);
	
	return ids;
}

async function getById(id)
{
	const res = await database.query(
		'SELECT id, name, url, transcript_url, duration, sales_meeting, actors_involved, video_date, upload_date, platform, language, app_user_id, new_version_video_id FROM video WHERE id = $1',
		[ id ]
	);
	
	if (res.rows.length === 0)
		throw new VideoIdDoesNotExistsError(id);
	
	return res.rows[0];
}

module.exports = {
	create,
	getDurationInSeconds,
	getAllIds,
	getById
};
