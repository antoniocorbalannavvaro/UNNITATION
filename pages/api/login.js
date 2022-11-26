import { getUser } from '../main/database';
import { createSession } from '../main/session';
import { AppError, InvalidRequestError, InvalidLoginError } from '../main/errors';

export default async (req, res) => {
	try
	{
		if (!(req.query && 'username' in req.query && 'password' in req.query))
			throw new InvalidRequestError(req);
		
		const { id, password } = await getUser({ email: req.query.username });
		
		if (req.query.password !== password)
			throw new InvalidLoginError(req.query.username, req.query.password);
		
		await createSession(id, req, res);
		res.send({ error: false });
	}
	catch (err)
	{
		if (!(err instanceof AppError))
			throw err;
		
		res.send({ error: true, reason: err.message });
	}
};
