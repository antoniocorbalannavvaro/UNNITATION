import Cookies from 'cookies';
import database from '../database';
import * as session from '../session';

export default async (req, res) => {
	if (!(req.query && 'username' in req.query && 'password' in req.query))
	{
		res.send({ error: true, reason: 'Invalid request.' });
		return;
	}
	
	const dbRes = await database.query('SELECT password FROM AppUser WHERE email = $1', [req.query.username]);
	
	if (dbRes.rows.length !== 1)
	{
		res.send({ error: true, reason: `User ${req.query.username} does not exist.` });
		return;
	}
	
	if (req.query.password !== dbRes.rows[0].password)
	{
		res.send({ error: true, reason: 'Invalid password.' });
		return;
	}
	
	const cookies = new Cookies(req, res);
	
	const {sessionId, sessionInfo} = session.create(req.query.username);
	cookies.set('SESSION_ID', sessionId, { expires: sessionInfo.expires });
	res.send({ error: false });
};
