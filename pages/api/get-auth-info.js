import Cookies from 'cookies';
import { getUserInfo } from '../database';
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
	
	const userInfo = await getUserInfo(sessionInfo.userId);
	
	res.send(userInfo);
};

