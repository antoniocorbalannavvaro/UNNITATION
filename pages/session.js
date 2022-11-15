import crypto from 'crypto';

const SESSION_DURATION = 10;	/* In minutes */
const SESSION_LENGTH = 32;		/* In bytes */

const sessions = new Map();
const sessionIdByUserId = new Map();

export function create(userId)
{
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
		sessionIdByUserId.delete(sessionInfo.userId);
		return null;
	}
	
	const newExpirationDate = new Date();
	newExpirationDate.setMinutes(newExpirationDate.getMinutes() + SESSION_DURATION);
	
	sessionInfo.expires = newExpirationDate;
	
	return sessionInfo;
}
