import crypto from 'crypto';
import * as AppUser from '../../main/data-access-layer/app-user';

export default async (req, res) => {
	try
	{
		/* TODO: get from cookie session */
		const userId = 1;
		console.log(req.body)
		const invitationToken = crypto.randomBytes(64).toString('hex');
		await AppUser.create(req.body.email, req.body.roles, req.body.annotationDedicationTime, userId, invitationToken);
		
		res.json({ error: false, invitation: invitationToken });
	}
	catch (err)
	{
		res.json({ error: true, reason: err.message });
	}
};
