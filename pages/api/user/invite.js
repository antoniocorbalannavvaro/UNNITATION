import { createUser } from '../../database';
import { AppError, InvalidRequestError } from '../../errors';

export default async (req, res) => {
	try
	{
		await createUser(req.body.email, req.body.roles, req.body.annotationDedicationTime, null);
		res.json({ error: false });
	}
	catch (err)
	{
		res.json({ error: true, reason: err.message });
	}
};
