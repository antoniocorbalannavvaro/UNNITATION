const express = require('express');
const AppUser = require('data-access-layer/app-user');

const router = express.Router();

router.get('/:invitationToken', async (req, res, next) => {
	try
	{
		const { invitationToken } = req.params;
		const userId = await AppUser.getIdByInvitation(invitationToken);
		await res.createAppUserSession(userId);
		res.json({ error: false });
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;
