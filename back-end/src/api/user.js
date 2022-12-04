const crypto = require('crypto');
const express = require('express');
const AppUser = require('data-access-layer/app-user');
const { InvalidLoginError, InvalidUserRoleError } = require('errors/app-user-error');
const { InvalidRequestError } = require('errors/request-error');
const checkLogin = require('api/middleware/check-login');

const router = express.Router();

router.get('/login', async (req, res, next) => {
	try
	{
		if (!('email' in req.query && 'password' in req.query))
			throw new InvalidRequestError(req);
		
		const appUser = await AppUser.getByEmail(req.query.email);
		
		if (req.query.password !== appUser.password)
			throw new InvalidLoginError(req.query.email, req.query.password);
		
		await res.createAppUserSession(appUser.id);
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

router.use(checkLogin());

router.post('/invite', async (req, res, next) => {
	try
	{
		if (!(await AppUser.isAdministrator(req.appUser.id)))
			throw new InvalidUserRoleError(req.appUser.id);
		
		if (typeof req.body.email !== 'string' || !(req.body.roles instanceof Array))
			throw new InvalidRequestError(req);
		
		let hasAnnotatorRole = false;
		
		for (const role of req.body.roles)
		{
			if (typeof role !== 'string')
				throw new InvalidRequestError(req);
			
			if (role === 'ANNOTATOR')
				hasAnnotatorRole = true;
		}
		
		if (hasAnnotatorRole)
		{
			if (typeof req.body.annotationDedicationTime !== 'number')
				throw new InvalidRequestError(req);
		}
		else
		{
			if ('annotationDedicationTime' in req.body)
				throw new InvalidRequestError(req);
			
			req.body.annotationDedicationTime = null;
		}
		
		const invitationToken = crypto.randomBytes(64).toString('hex');
		await AppUser.create(req.body.email, req.body.roles, req.body.annotationDedicationTime, req.appUser.id, invitationToken);
		
		/* TODO: send the invitation link to the email */
		
		res.json({ error: false, invitationUrl: `/invitation/${invitationToken}` });
	}
	catch (err)
	{
		next(err);
	}
});

router.post('/accept', async (req, res, next) => {
	try
	{
		if (
			typeof req.body.password !== 'string' ||
			typeof req.body.firstName !== 'string' ||
			('middleName' in req.body && typeof req.body.middleName !== 'string') ||
			typeof req.body.lastName !== 'string' ||
			typeof req.body.birthDate !== 'string' ||
			typeof req.body.gender !== 'string' ||
			typeof req.body.department !== 'string' ||
			typeof req.body.mainLanguage !== 'string' ||
			!(req.body.secondaryLanguages instanceof Array)
		)
			throw new InvalidRequestError(req);
		
		for (const secondaryLanguage of req.body.secondaryLanguages)
			if (typeof secondaryLanguage !== 'string')
				throw new InvalidRequestError(req);
		
		const birthDate = new Date(req.body.birthDate);
		
		await AppUser.complete(req.appUser.id, req.body.password, req.body.firstName, req.body.middleName, req.body.lastName, birthDate, req.body.gender, req.body.department, req.body.mainLanguage, req.body.secondaryLanguages);
		
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

async function getAppUser(userId)
{
	const appUser = await AppUser.getById(userId);
	
	const roles = await AppUser.getUserRoles(userId);
	const mainLanguage = await AppUser.getMainLanguage(userId);
	const secondaryLanguages = await AppUser.getSecondaryLanguages(userId);
	
	/* TODO: return the experiments of this user (id, name, labels, IA) */
	return {
		id: appUser.id,
		email: appUser.email,
		annotationDedicationTime: appUser.annotation_dedication_time === null ? undefined : appUser.annotation_dedication_time,
		firstName: appUser.first_name,
		middleName: appUser.middle_name,
		lastName: appUser.last_name,
		birthDate: appUser.birth_date,
		gender: appUser.gender,
		department: appUser.department,
		roles: roles,
		mainLanguage: mainLanguage,
		secondaryLanguages: secondaryLanguages
	};
}

router.get('/info', async (req, res, next) => {
	try
	{
		if ('userId' in req.query)
		{
			if (!(await AppUser.isAdministrator(req.appUser.id)) && !(await AppUser.isDataScientist(req.appUser.id)))
				throw new InvalidUserRoleError(req.appUser.id);
			
			const appUserId = parseInt(req.query.userId);
			res.json(await getAppUser(appUserId));
		}
		else
			res.json(await getAppUser(req.appUser.id));
	}
	catch (err)
	{
		next(err);
	}
});

router.get('/list', async (req, res, next) => {
	/* TODO: accept filters */
	try
	{
		if (!(await AppUser.isAdministrator(req.appUser.id)) && !(await AppUser.isDataScientist(req.appUser.id)))
			throw new InvalidUserRoleError(req.appUser.id);
		
		const appUsers = [];
		
		for (const userId of await AppUser.getAllIds())
			appUsers.push(await getAppUser(userId));
		
		res.json(appUsers);
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;
