import { Pool } from 'pg';

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



