const database = require('./database');
const {
	InvalidInvitationError,
	AlreadyRegisteredError,
	AppUserDoesNotExistError,
	AppUserEmailDoesNotExistError,
	NotUniqueMainLanguageError,
	NoCurrentExperimentAppUserError,
	MoreThanOneCurrentExperimentAppUserError
} = require('errors/app-user-error');

async function create(email, roles, annotationDedicationTime, createdBy, invitationToken)
{
	/* TODO: assert type preconditions */
	const client = await database.connect();
	
	try
	{
		await client.query('BEGIN');
		
		const res = await client.query(
			'INSERT INTO app_user(email, annotation_dedication_time, created_by) VALUES ($1, $2, $3) RETURNING id',
			[email, annotationDedicationTime, createdBy]
		);
		
		const userId = res.rows[0].id;
		
		for (const role of roles)
		{
			await client.query(
				'INSERT INTO app_user_user_role(user_role, app_user_id) VALUES ($1, $2)',
				[role, userId]
			);
		}
		
		await client.query('INSERT INTO invitation(token, app_user_id) VALUES ($1, $2)', [invitationToken, userId]);
		
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

async function complete(userId, password, firstName, middleName, lastName, birthDate, gender, department, mainLanguage, secondaryLanguages)
{
	/* TODO: assert type preconditions */
	const client = await database.connect();
	
	try
	{
		await client.query('BEGIN');
		
		let res = await client.query('SELECT app_user_id FROM invitation WHERE app_user_id = $1', [userId]);
		
		if (res.rows.length === 0)
			throw new AlreadyRegisteredError(userId);
		
		res = await client.query(
			'UPDATE app_user SET completed_date = (SELECT NOW()), password = $2, first_name = $3, middle_name = $4, last_name = $5, birth_date = $6, gender = $7, department = $8 WHERE id = $1 RETURNING id',
			[userId, password, firstName, middleName, lastName, birthDate, gender, department]
		);
		
		if (res.rows.length === 0)
			throw new AppUserDoesNotExistError(userId);
		
		await client.query(
			'INSERT INTO app_user_language(is_main, language, app_user_id) VALUES ($1, $2, $3)',
			[true, mainLanguage, userId]
		);
		
		for (const secondaryLanguage of secondaryLanguages)
		{
			await client.query(
				'INSERT INTO app_user_language(is_main, language, app_user_id) VALUES ($1, $2, $3)',
				[false, secondaryLanguage, userId]
			);
		}
		
		await client.query('DELETE FROM invitation WHERE app_user_id = $1', [userId]);
		
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

async function getIdByInvitation(invitationToken)
{
	const res = await database.query('SELECT app_user_id FROM invitation WHERE token = $1', [invitationToken]);
	
	if (res.rows.length === 0)
		throw new InvalidInvitationError();
	
	return res.rows[0].app_user_id;
}

async function getById(userId)
{
	const res = await database.query('SELECT * FROM app_user WHERE id = $1', [userId]);
	
	if (res.rows.length === 0)
		throw new AppUserDoesNotExistError(userId);
	
	return res.rows[0];
}

async function getByEmail(email)
{
	const res = await database.query('SELECT * FROM app_user WHERE email = $1', [email]);
	
	if (res.rows.length === 0)
		throw new AppUserEmailDoesNotExistError(email);
	
	return res.rows[0];
}

async function getUserRoles(userId)
{
	const res = await database.query('SELECT user_role FROM app_user_user_role WHERE app_user_id = $1', [userId]);
	
	const roles = [];
	
	for (const { user_role } of res.rows)
		roles.push(user_role);
	
	return roles;
}

async function getMainLanguage(userId)
{
	const res = await database.query('SELECT language FROM app_user_language WHERE is_main = $2 AND app_user_id = $1', [userId, true]);
	
	if (res.rows.length !== 1)
		throw new NotUniqueMainLanguageError(userId);
	
	return res.rows[0].language;
}

async function getSecondaryLanguages(userId)
{
	const res = await database.query('SELECT language FROM app_user_language WHERE is_main = $2 AND app_user_id = $1', [userId, false]);
	
	const languages = [];
	
	for (const { language } of res.rows)
		languages.push(language);
	
	return languages;
}

async function isAdministrator(userId)
{
	const res = await database.query('SELECT user_role FROM app_user_user_role WHERE app_user_id = $1 AND user_role = $2', [userId, 'ADMINISTRATOR']);
	
	if (res.rows.length === 0)
		return false;
	
	return true;
}

async function isDataScientist(userId)
{
	const res = await database.query('SELECT user_role FROM app_user_user_role WHERE app_user_id = $1 AND user_role = $2', [userId, 'DATA_SCIENTIST']);
	
	if (res.rows.length === 0)
		return false;
	
	return true;
}

async function isAnnotator(userId)
{
	const res = await database.query('SELECT user_role FROM app_user_user_role WHERE app_user_id = $1 AND user_role = $2', [userId, 'ANNOTATOR']);
	
	if (res.rows.length === 0)
		return false;
	
	return true;
}

async function getCurrentExperimentId(userId)
{
	const res = await database.query(
		'SELECT a.experiment_id FROM annotation AS a JOIN experiment AS e ON e.id = a.experiment_id WHERE a.completed_date IS NULL AND e.aborted_date IS NULL AND a.app_user_id = $1 GROUP by a.experiment_id',
		[ userId ]
	);
	
	if (res.rows.length === 0)
		throw new NoCurrentExperimentAppUserError(userId);
	
	if (res.rows.length > 1)
		throw new MoreThanOneCurrentExperimentAppUserError(userId);
	
	return res.rows[0].experiment_id;
}

async function getAllIds()
{
	const res = await database.query('SELECT id FROM app_user WHERE completed_date IS NOT NULL');
	
	const ids = [];
	
	for (const row of res.rows)
		ids.push(row.id);
	
	return ids;
}

module.exports = {
	create,
	complete,
	getIdByInvitation,
	getById,
	getByEmail,
	getUserRoles,
	getMainLanguage,
	getSecondaryLanguages,
	isAdministrator,
	isDataScientist,
	isAnnotator,
	getCurrentExperimentId,
	getAllIds
};
