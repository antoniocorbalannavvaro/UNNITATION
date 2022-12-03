const database = require('./database');
const { LabelNotFoundError } = require('errors/label-error');

async function create(name, emojiUnicode, userId)
{
	await database.query(
		'INSERT INTO label(name, emoji_unicode, app_user_id) VALUES ($1, $2, $3)',
		[name, emojiUnicode, userId]
	);
}

async function getAllIds()
{
	const res = await database.query('SELECT id FROM label');
	
	const ids = [];
	for (const { id } of res.rows)
		ids.push(id);
	
	return ids;
}

async function getById(id)
{
	const res = await database.query(
		'SELECT id, name, emoji_unicode, app_user_id FROM label WHERE id = $1',
		[ id ]
	);
	
	if (res.rows.length === 0)
		throw new LabelNotFoundError(id);
	
	return res.rows[0];
}

module.exports = {
	create,
	getAllIds,
	getById
}
