import crypto from 'crypto';
import Cookies from 'cookies';
import * as AppUserSession from '../data-access-layer/app-user-session';
import { NoSessionProvidedError, SessionExpiredError } from '../errors/session-error';
import { NoRowsError } from '../errors/database-error';

const SESSION_DURATION = 10;	/* In minutes */
const SESSION_LENGTH = 32;		/* In bytes */

export const SESSION_ID_COOKIE_LABEL = 'SESSION_ID';

export async function create(userId, req, res)
{
	const cookies = new Cookies(req, res);
	const token = crypto.randomBytes(SESSION_LENGTH).toString('hex');
	
	await AppUserSession.create(token, userId);
	
	cookies.set(SESSION_ID_COOKIE_LABEL, token, { expires: getExpirationDate(new Date()) });
}

export async function getAppUserId(req, res)
{
	const cookies = new Cookies(req, res);
	const token = cookies.get(SESSION_ID_COOKIE_LABEL);
	
	if (token === undefined)
		throw new NoSessionProvidedError();
	
	const session = await AppUserSession.get(token);
	
	const expires = getExpirationDate(session.lately_accessed);
	
	if (expires < (new Date()))
	{
		AppUserSession.remove(token);
		throw new SessionExpiredError(token);
	}
	
	AppUserSession.refresh(token);
	
	cookies.set(SESSION_ID_COOKIE_LABEL, token, { expires: getExpirationDate(new Date()) });
	
	return session.app_user_id;
}

/* Internal */

function getExpirationDate(date)
{
	const expires = new Date(date);
	expires.setMinutes(expires.getMinutes() + SESSION_DURATION);
	return expires;
}
