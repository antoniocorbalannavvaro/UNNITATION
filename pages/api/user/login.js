import * as AppUser from '../../main/data-access-layer/app-user';
import * as Session from '../../main/model/session';
import AppError from '../../main/errors/app-error';
import { InvalidRequestError } from '../../main/errors/request-error';
import { InvalidLoginError } from '../../main/errors/app-user-error';

export default async (req, res) => {
	try
	{
		if (!(req.query && 'username' in req.query && 'password' in req.query))
			throw new InvalidRequestError(req);
		
		const appUser = await AppUser.getByEmail(req.query.username);
		
		if (req.query.password !== appUser.password)
			throw new InvalidLoginError(req.query.username, req.query.password);
		
		await Session.create(appUser.id, req, res);
		
		res.send({ error: false });
	}
	catch (err)
	{
		if (!(err instanceof AppError))
			throw err;
		
		res.send({ error: true, reason: err.message });
	}
};
