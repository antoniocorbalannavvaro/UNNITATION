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

