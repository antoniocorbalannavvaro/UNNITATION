import crypto from 'crypto';
import Cookies from 'cookies';
import { createUserSession, getUserSession, refreshUserSession, deleteUserSession } from './database';
import { NoSessionTokenError, InvalidSessionTokenError, SessionExpiredError } from './errors';

const SESSION_DURATION = 10;	/* In minutes */
const SESSION_LENGTH = 32;		/* In bytes */

export const SESSION_ID_COOKIE_LABEL = 'SESSION_ID';

function getExpirationDate(date)
{
	const expires = new Date(date);
	expires.setMinutes(expires.getMinutes() + SESSION_DURATION);
	return expires;
}

export async function createSession(userId, req, res)
{
	const cookies = new Cookies(req, res);
	const token = crypto.randomBytes(SESSION_LENGTH).toString('base64');
	
	await createUserSession(token, userId);
	
	cookies.set(SESSION_ID_COOKIE_LABEL, token, { expires: getExpirationDate(new Date()) });
}

export async function getUserId(req, res)
{
	const cookies = new Cookies(req, res);
	const token = cookies.get(SESSION_ID_COOKIE_LABEL);
	
	if (sessionId === undefined)
		throw new NoSessionTokenError();
	
	const userSession = await getUserSession(token);
	
	const expires = getExpirationDate(userSession.latelyAccessed);
	
	if (expires < (new Date()))
	{
		deleteUserSession(token);
		throw new SessionExpiredError(token);
	}
	
	refreshUserSession(token);
	
	cookies.set(SESSION_ID_COOKIE_LABEL, token, { expires: getExpirationDate(new Date()) });
	
	return userSession.userId;
}
