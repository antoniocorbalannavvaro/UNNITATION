import { Pool } from 'pg';
import { InvalidLoginError, UserInfoError } from './errors';

const pool = new Pool({
	user: process.env.USER,
	password: null,
	database: 'unnitation',
	host: 'localhost',
	port: 5432
});

pool.on('error', (err) => {
	console.error(err);
	process.exit(-1);
});

export async function userLogin(userEmail, password)
{
	const dbRes = await pool.query('SELECT id FROM AppUser WHERE email = $1 AND password = $2', [userEmail, password]);
	
	if (dbRes.rows.length !== 1)
		throw new InvalidLoginError(userEmail, password);
	
	return dbRes.rows[0].id;
}

export async function getUserInfo(userId)
{
	const dbRes = await pool.query('SELECT au.email, ui.name, ui.middleName, ui.lastName, ui.mainLanguage, sl.language AS secondaryLanguage, sl.level AS secondaryLanguageLevel, ui.gender, ui.departament FROM AppUser au JOIN UserInfo ui ON ui.appUserId = au.id JOIN SecondaryLanguage sl ON sl.id = ui.secondaryLanguageId WHERE au.id = $1', [userId]);
	
	if (dbRes.rows.length !== 1)
		throw new UserInfoError(userId);
	
	return {
		email: dbRes.rows[0].email,
		name: dbRes.rows[0].name,
		middleName: dbRes.rows[0].middlename,
		lastName: dbRes.rows[0].lastname,
		mainLanguage: dbRes.rows[0].mainlanguage,
		secondaryLanguage: dbRes.rows[0].secondarylanguage,
		secondaryLanguageLevel: dbRes.rows[0].secondarylanguagelevel,
		gender: dbRes.rows[0].gender,
		departament: dbRes.rows[0].departament
	};
}

