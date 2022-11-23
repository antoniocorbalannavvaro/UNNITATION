import { userLogin } from '../database';
import { createSession } from '../session';
import { AppError, InvalidRequestError } from '../errors';

export default async (req, res) => {
	try
	{
		if (!(req.query && 'username' in req.query && 'password' in req.query))
			throw new InvalidRequestError(req);
		
		const userId = await userLogin(req.query.username, req.query.password);
		createSession(userId, req, res);
		res.send({ error: false });
	}
	catch (err)
	{
		if (!(err instanceof AppError))
			throw err;
		
		res.send({ error: true, reason: err.message });
	}
};
