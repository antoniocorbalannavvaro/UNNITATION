import crypto from 'crypto';

const SESSION_DURATION = 10;	/* In minutes */
const SESSION_LENGTH = 32;		/* In bytes */

const sessions = new Map();

export function create(username)
{
	const sessionId = crypto.randomBytes(SESSION_LENGTH).toString('base64');
	const started = new Date();
	const expires = new Date(started);
	expires.setMinutes(started.getMinutes() + SESSION_DURATION);
	
	const sessionInfo = {
		username,
		started,
		expires
	};
	
	sessions.set(sessionId, sessionInfo);
	
	return { sessionId, sessionInfo };
}

export function get(sessionId)
{
	const sessionInfo = sessions.get(sessionId);
	
	if (!sessionInfo)
		return null;
	
	if (sessionInfo.expires < (new Date()))
	{
		sessions.delete(sessionId);
		return null;
	}
	
	const newExpirationDate = new Date();
	newExpirationDate.setMinutes(newExpirationDate.getMinutes() + SESSION_DURATION);
	
	sessionInfo.expires = newExpirationDate;
	
	return sessionInfo;
}
