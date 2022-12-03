const crypto = require('crypto');
const Cookies = require('cookies');
const AppUserSession = require('data-access-layer/app-user-session');
const AppUser = require('data-access-layer/app-user');
const { SessionExpiredError } = require('errors/session-error');

const SESSION_ID_COOKIE_LABEL = 'SESSION_ID';

/*
 * Populates:
 * 		res.createAppUserSession(userId);
 *		req.appUser;
 */

function middleware(sessionDuration, sessionTokenLength)
{
	function getExpirationDate(date)
	{
		const expires = new Date(date);
		expires.setMinutes(expires.getMinutes() + sessionDuration);
		return expires;
	}
	
	async function handler(req, res, next)
	{
		const cookies = new Cookies(req, res);
		
		res.createAppUserSession = async (userId) => {
			const token = crypto.randomBytes(sessionTokenLength).toString('hex');
			await AppUserSession.create(token, userId);
			cookies.set(SESSION_ID_COOKIE_LABEL, token, { expires: getExpirationDate(new Date()) });
		};
		
		async function getAppUser()
		{
			const token = cookies.get(SESSION_ID_COOKIE_LABEL);
			
			if (token === undefined)
				return undefined;
			
			const session = await AppUserSession.get(token);
			
			const expires = getExpirationDate(session.lately_accessed);
			
			if (expires < (new Date()))
			{
				AppUserSession.remove(token);
				throw new SessionExpiredError(token);
			}
			
			AppUserSession.refresh(token);
			
			cookies.set(SESSION_ID_COOKIE_LABEL, token, { expires: getExpirationDate(new Date()) });
			
			return await AppUser.getById(session.app_user_id);
		}
		
		try
		{
			req.appUser = await getAppUser();
			next();
		}
		catch (err)
		{
			next(err);
		}
	}
	
	return handler;
}

module.exports = middleware;
