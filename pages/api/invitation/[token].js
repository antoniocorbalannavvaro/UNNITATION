import * as AppUser from '../../main/data-access-layer/app-user';
import * as Session from '../../main/model/session';
import AppError from '../../main/errors/app-error';

export default async (req, res) => {
	try
	{
		const { token } = req.query;
		const userId = await AppUser.getIdByInvitation(token);
		
		await Session.create(userId, req, res);
		
		res.json({ error: false });
	}
	catch (err)
	{
		if (!(err instanceof AppError))
			throw err;
		
		res.json({ error: true, reason: err.message });
	}
}
