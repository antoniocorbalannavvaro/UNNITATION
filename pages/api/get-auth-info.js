import Cookies from 'cookies';
import { getUserInfo } from '../database';
import { getUserId } from '../session';
import { AppError } from '../errors';

export default async (req, res) => {
	try
	{
		const userId = getUserId(req, res);
		const userInfo = await getUserInfo(userId);
		res.send(userInfo);
	}
	catch (err)
	{
		if (!(err instanceof AppError))
			throw err;
		
		res.send({ error: true, reason: err.message });
	}
};

