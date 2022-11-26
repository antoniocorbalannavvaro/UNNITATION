import database from '../../main/data-access-layer/database';

export default async (req, res) => {
	const dbRes = await database.query('SELECT name, url, transcriptUrl, numActors, videoDate, uploadDate, platform, language FROM Video');
	
	const videos = [];
	
	/* TODO: Do it asynchronously (using cursors) */
	for (const row of dbRes.rows)
	{
		videos.push({
			name: row.name,
			properties: [
				{id: 'url', value: row.url},
				{id: 'transcriptUrl', value: row.transcripturl},
				{id: 'numActors', value: row.numactors},
				{id: 'videoDate', value: row.videodate},
				{id: 'uploadDate', value: row.uploaddate},
				{id: 'platform', value: row.platform},
				{id: 'language', value: row.language}
			]
		});
	};
	
	res.send(videos);
};
