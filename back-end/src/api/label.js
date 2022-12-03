const express = require('express');
const Label = require('data-access-layer/label');
const AppUser = require('data-access-layer/app-user');
const { InvalidUserRoleError } = require('errors/app-user-error');
const { InvalidRequestError } = require('errors/request-error');
const checkLogin = require('api/middleware/check-login');

const router = express.Router();

router.use(checkLogin());

router.post('/create', async (req, res, next) => {
	try
	{
		if (!(await AppUser.isAdministrator(req.appUser.id)))
			throw new InvalidUserRoleError(req.appUser.id);
		
		if (typeof req.body.name !== 'string' || typeof req.body.emojiUnicode !== 'string')
			throw new InvalidRequestError(req);
		
		await Label.create(req.body.name, req.body.emojiUnicode, req.appUser.id);
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

router.get('/list', async (req, res, next) => {
	try
	{
		const labels = [];
		
		for (const labelId of await Label.getAllIds())
		{
			const label = await Label.getById(labelId);
			
			labels.push({
				name: label.name,
				emojiUnicode: label.emoji_unicode
			});
		}
		
		res.json(labels);
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;
