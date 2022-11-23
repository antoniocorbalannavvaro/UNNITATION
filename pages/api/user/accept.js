import { completeUser } from '../../main/database';

export default async (req, res) => {
	try
	{
		/* TODO: get from cookie session */
		const userId = 1;
		
		const birthDate = new Date(req.body.birthDate);
		
		await completeUser(userId, req.body.password, req.body.firstName, req.body.middleName, req.body.lastName, birthDate, req.body.gender, req.body.department, req.body.mainLanguage, req.body.secondaryLanguages);
		
		res.json({ error: false });
	}
	catch (err)
	{
		res.json({ error: true, reason: err.message });
	}
};
