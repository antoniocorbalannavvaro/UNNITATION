import * as AppUser from '../../main/data-access-layer/app-user';
import * as Session from '../../main/model/session';
import AppError from '../../main/errors/app-error';
import { NoRowsError } from '../../main/errors/database-error';
import { InvalidInvitationError } from '../../main/errors/app-user-error';

export default async (req, res) => {
	try
	{
		const { token } = req.query;
		const userId = await AppUser.getIdByInvitation(token).catch(err => {
			if (err instanceof NoRowsError)
				throw new InvalidInvitationError(token);
			else
				throw err;
		});
		
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
