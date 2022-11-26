import * as AppUser from '../../main/data-access-layer/app-user';
import * as Session from '../../main/model/session';
import AppError from '../../main/errors/app-error';
import { InvalidRequestError } from '../../main/errors/request-error';

export default async (req, res) => {
	try
	{
		/* Assert preconditions */
		if (
			typeof req.body.password !== 'string' || 
			typeof req.body.firstName !== 'string' || 
			typeof req.body.middleName !== 'string' || 
			typeof req.body.lastName !== 'string' || 
			typeof req.body.birthDate !== 'string' || 
			typeof req.body.gender !== 'string' || 
			typeof req.body.department !== 'string' || 
			typeof req.body.mainLanguage !== 'string' || 
			!(req.body.secondaryLanguages instanceof Array)
		)
			throw new InvalidRequestError(req);
		
		for (const secondaryLanguage of req.body.secondaryLanguages)
			if (typeof secondaryLanguage !== 'string')
				throw new InvalidRequestError(req);
		
		const userId = await Session.getAppUserId(req, res);
		const birthDate = new Date(req.body.birthDate);
		
		await AppUser.complete(userId, req.body.password, req.body.firstName, req.body.middleName, req.body.lastName, birthDate, req.body.gender, req.body.department, req.body.mainLanguage, req.body.secondaryLanguages);
		
		res.json({ error: false });
	}
	catch (err)
	{
		if (!(err instanceof AppError))
			throw err;
		
		res.json({ error: true, reason: err.message });
	}
};
