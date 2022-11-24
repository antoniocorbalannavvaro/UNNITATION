import { Pool } from 'pg';
import { SingleRowError, InvalidQueryParametersError } from './errors';

const pool = new Pool({
	user: process.env.USER,
	password: '12345678',
	database: 'unnitation',
	host: 'localhost',
	port: 5432
});

pool.on('error', (err) => {
	console.error(err);
	process.exit(-1);
});

export async function createUser(email, roles, annotationDedicationTime, createdBy)
{
	/* TODO: assert type preconditions */
	const client = await pool.connect();
	
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

export async function completeUser(userId, password, firstName, middleName, lastName, birthDate, gender, department, mainLanguage, secondaryLanguages)
{
	/* TODO: assert type preconditions */
	const client = await pool.connect();
	
	try
	{
		await client.query('BEGIN');
		
		const res = await client.query(
			'UPDATE app_user SET completed_date = (SELECT NOW()), password = $2, first_name = $3, middle_name = $4, last_name = $5, birth_date = $6, gender = $7, department = $8 WHERE id = $1',
			[userId, password, firstName, middleName, lastName, birthDate, gender, department]
		);
		
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

export async function getUser(params)
{
	const queryFields = [
		'id', 'email', 'password',
		'annotation_dedication_time', 'completed_date',
		'first_name', 'middle_name', 'last_name',
		'birth_date', 'gender', 'department', 'created_by'
	];
	
	const queryParam = (() => {
		for (const param of queryFields)
			if (param in params)
				return param;
		throw new InvalidQueryParametersError(params);
	})();
	
	const res = await pool.query(
		`SELECT ${queryFields.join()} FROM app_user WHERE ${queryParam} = $1`,
		[params[queryParam]]
	);
	
	if (res.rows.length !== 1)
		throw new SingleRowError();
	
	return {
		id: res.rows[0].id,
		email: res.rows[0].email,
		password: res.rows[0].password,
		annotationDedicationTime: res.rows[0].annotation_dedication_time,
		completedDate: res.rows[0].completed_date,
		firstName: res.rows[0].first_name,
		middleName: res.rows[0].middle_name,
		lastName: res.rows[0].last_name,
		birthDate: res.rows[0].birth_date,
		gender: res.rows[0].gender,
		department: res.rows[0].department,
		createdBy: res.rows[0].created_by
	};
}

/* TODO: handle (very unlikely but possible) token collisions (DATABASE DUPLICATED PRIMARY KEY) */
export async function createUserSession(token, userId)
{
	const res = await pool.query(
		'SELECT app_user_id FROM app_user_session WHERE app_user_id = $1',
		[userId]
	);
	
	/* If the user is already logged in, the previous token is replaced */
	if (res.rows.length === 1)
	{
		const res = await pool.query(
			'UPDATE app_user_session SET token = $1, lately_accessed = (SELECT NOW()) WHERE app_user_id = $2',
			[token, userId]
		);
	}
	else
	{
		await pool.query(
			'INSERT INTO app_user_session(token, lately_accessed, app_user_id) VALUES ($1, (SELECT NOW()), $2)',
			[token, userId]
		);
	}
}

export async function getUserSession(token)
{
	const res = await pool.query(
		'SELECT app_user_id, lately_accessed FROM app_user_session WHERE token = $1',
		[token]
	);
	
	if (res.rows.length !== 1)
		throw new SingleRowError();
	
	return {
		userId: res.rows[0].app_user_id,
		latelyAccessed: res.rows[0].lately_accessed
	};
}

export async function refreshUserSession(token)
{
	await pool.query(
		'UPDATE app_user_session SET lately_accessed = (SELECT NOW()) WHERE token = $1',
		[token]
	);
}

export async function deleteUserSession(token)
{
	await pool.query(
		'DELETE FROM app_user_session WHERE token = $1',
		[token]
	);
}

