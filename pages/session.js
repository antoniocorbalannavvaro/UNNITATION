import crypto from 'crypto';
import Cookies from 'cookies';
import { NoSessionTokenError, InvalidSessionTokenError, SessionExpiredError } from './errors';

const SESSION_DURATION = 10;	/* In minutes */
const SESSION_LENGTH = 32;		/* In bytes */

const sessions = new Map();
const sessionIdByUserId = new Map();

export const SESSION_ID_COOKIE_LABEL = 'SESSION_ID';

export function createSession(userId, req, res)
{
	const cookies = new Cookies(req, res);
	const sessionId = crypto.randomBytes(SESSION_LENGTH).toString('base64');
	
	/* Delete the previous session (if it exists) */
	if (sessionIdByUserId.get(userId) !== undefined)
	{
		const previousSessionId = sessionIdByUserId.get(userId);
		sessions.delete(previousSessionId);
		sessionIdByUserId.delete(userId);
	}
	
	const started = new Date();
	const expires = new Date(started);
	expires.setMinutes(started.getMinutes() + SESSION_DURATION);
	
	const sessionInfo = {
		userId,
		started,
		expires
	};
	
	sessions.set(sessionId, sessionInfo);
	sessionIdByUserId.set(userId, sessionId);
	
	cookies.set(SESSION_ID_COOKIE_LABEL, sessionId, { expires });
}

export function getUserId(req, res)
{
	const cookies = new Cookies(req, res);
	
	const sessionId = cookies.get(SESSION_ID_COOKIE_LABEL);
	
	if (sessionId === undefined)
		throw new NoSessionTokenError();
	
	const sessionInfo = sessions.get(sessionId);
	
	if (sessionInfo === undefined)
		throw new InvalidSessionTokenError(sessionId);
	
	if (sessionInfo.expires < (new Date()))
	{
		sessions.delete(sessionId);
		sessionIdByUserId.delete(sessionInfo.userId);
		throw new SessionExpiredError(sessionId);
	}
	
	const newExpirationDate = new Date();
	newExpirationDate.setMinutes(newExpirationDate.getMinutes() + SESSION_DURATION);
	
	sessionInfo.expires = newExpirationDate;
	cookies.set(SESSION_ID_COOKIE_LABEL, sessionId, { expires: newExpirationDate });
	
	return sessionInfo.userId;
}
