import database from './database';
import { NoRowsError } from '../errors/database-error';
import { InvalidInvitationError, AlreadyRegisteredError } from '../errors/app-user-error';

export async function create(email, roles, annotationDedicationTime, createdBy, invitationToken)
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

export async function complete(userId, password, firstName, middleName, lastName, birthDate, gender, department, mainLanguage, secondaryLanguages)
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
			throw new NoRowsError();
		
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

export async function getIdByInvitation(invitationToken)
{
	const res = await database.query('SELECT app_user_id FROM invitation WHERE token = $1', [invitationToken]);
	
	if (res.rows.length === 0)
		throw new InvalidInvitationError();
	
	return res.rows[0].app_user_id;
}

export async function getById(userId)
{
	const res = await database.query('SELECT * FROM app_user WHERE id = $1', [userId]);
	
	if (res.rows.length === 0)
		throw new NoRowsError();
	
	return res.rows[0];
}

export async function getByEmail(email)
{
	const res = await database.query('SELECT * FROM app_user WHERE email = $1', [email]);
	
	if (res.rows.length === 0)
		throw new NoRowsError();
	
	return res.rows[0];
}
