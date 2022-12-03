const database = require('./database');
const { InvalidSessionError } = require('errors/session-error');

/* TODO: handle (very unlikely but possible) token collisions (DATABASE DUPLICATED PRIMARY KEY) */
async function create(token, userId)
{
	const res = await database.query(
		'SELECT app_user_id FROM app_user_session WHERE app_user_id = $1',
		[userId]
	);
	
	/* If the user is already logged in, the previous token is replaced */
	if (res.rows.length === 1)
	{
		await database.query(
			'UPDATE app_user_session SET token = $1, lately_accessed = (SELECT NOW()) WHERE app_user_id = $2',
			[token, userId]
		);
	}
	else
	{
		await database.query(
			'INSERT INTO app_user_session(token, lately_accessed, app_user_id) VALUES ($1, (SELECT NOW()), $2)',
			[token, userId]
		);
	}
}

async function get(token)
{
	const res = await database.query('SELECT * FROM app_user_session WHERE token = $1', [token]);
	
	if (res.rows.length === 0)
		throw new InvalidSessionError(token);
	
	return res.rows[0];
}

async function refresh(token)
{
	await database.query(
		'UPDATE app_user_session SET lately_accessed = (SELECT NOW()) WHERE token = $1',
		[token]
	);
}

async function remove(token)
{
	const res = await database.query(
		'DELETE FROM app_user_session WHERE token = $1 RETURNING token',
		[token]
	);
	
	if (res.rows.length === 0)
		throw new InvalidSessionError(token);
}

module.exports = {
	create,
	get,
	refresh,
	remove
};
