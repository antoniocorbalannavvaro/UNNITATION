import { createUser } from '../../main/database';

export default async (req, res) => {
	try
	{
		/* TODO: get from cookie session */
		const userId = 1;
		
		await createUser(req.body.email, req.body.roles, req.body.annotationDedicationTime, userId);
		res.json({ error: false });
	}
	catch (err)
	{
		res.json({ error: true, reason: err.message });
	}
};
