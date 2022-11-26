import * as AppUser from '../../main/data-access-layer/app-user';
import * as Session from '../../main/model/session';
import AppError from '../../main/errors/app-error';

export default async (req, res) => {
	try
	{
		const userId = await Session.getAppUserId(req, res);
		const appUser = await AppUser.getById(userId);
		
		res.json({
			error: false, 
			email: appUser.email,
			annotationDedicationTime: appUser.annotation_dedication_time,
			firstName: appUser.first_name,
			middleName: appUser.middle_name,
			lastName: appUser.last_name,
			birthDate: appUser.birth_date,
			gender: appUser.gender,
			department: appUser.department
		});
	}
	catch (err)
	{
		if (!(err instanceof AppError))
			throw err;
		
		res.send({ error: true, reason: err.message });
	}
};
