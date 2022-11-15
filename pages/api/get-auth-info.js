import Cookies from 'cookies';
import database from '../database';
import * as session from '../session';

export default async (req, res) => {
	const cookies = new Cookies(req, res);
	
	const sessionId = cookies.get(session.SESSION_ID_COOKIE_LABEL);
	
	if (sessionId === undefined)
	{
		res.send({ error: true, reason: 'No session token provided' });
		return;
	}
	
	const sessionInfo = session.get(sessionId);
	
	if (sessionInfo === undefined)
	{
		res.send({ error: true, reason: 'Session not registered' });
		return;
	}
	
	const dbRes = await database.query('SELECT au.email, ui.name, ui.middleName, ui.lastName, ui.mainLanguage, sl.language AS secondaryLanguage, sl.level AS secondaryLanguageLevel, ui.gender, ui.departament FROM AppUser au JOIN UserInfo ui ON ui.appUserId = au.id JOIN SecondaryLanguage sl ON sl.id = ui.secondaryLanguageId WHERE au.id = $1', [sessionInfo.userId]);
	
	if (dbRes.rows.length !== 1)
	{
		res.send({ error: true, reason: 'Invalid user' });
		return;
	}
	
	res.send({
		email: dbRes.rows[0].email,
		name: dbRes.rows[0].name,
		middleName: dbRes.rows[0].middlename,
		lastName: dbRes.rows[0].lastname,
		mainLanguage: dbRes.rows[0].mainlanguage,
		secondaryLanguage: dbRes.rows[0].secondarylanguage,
		secondaryLanguageLevel: dbRes.rows[0].secondarylanguagelevel,
		gender: dbRes.rows[0].gender,
		departament: dbRes.rows[0].departament
	});
};

