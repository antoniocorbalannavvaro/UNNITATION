const express = require('express');
const checkLogin = require('api/middleware/check-login');

const router = express.Router();

router.use(checkLogin());

router.get('/', async (req, res, next) => {
	try
	{
		const meta = {
			url: { type: 'text', label: 'URL' },
			transcriptUrl: { type: 'text', label: 'Transcript URL' },
			numActors: { type: 'number', label: 'Participants' },
			videoDate: { type: 'date', label: 'Video date' },
			platform: { type: 'select', label: 'Platform', options: ['GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS'] },
			language: { type: 'select', label: 'Language', options: ['SPANISH', 'ENGLISH', 'INDIAN', 'CHINESE'] },
			gender: { type: 'select', label: 'Gender', options: ['MALE', 'FEMALE', 'TRANS', 'NON_BINARY', 'NOT_APPLICABLE'] },
			departament: { type: 'select',  label: 'Departament', options: ['SALES', 'ENGINEERING', 'SUPPORT', 'CALL_CENTER'] },
			roles: { type: 'select', label: 'Roles', options: ['ADMINISTRATOR', 'DATA_SCIENTIST', 'ANNOTATOR'] },
			birthDate: { type: 'date', label: 'Birth Date' },
			email: { type: 'text', label: 'Email'},
			firstName: { type: 'text', label: 'First Name' },
			lastName: { type: 'text', label: 'Last Name'},
			id: { type: 'number', label: 'ID'},
			mainLanguage: { type: 'select', label: 'Main Language', options: ['SPANISH','ENGLISH','CHINESE']},
			middleName: { type: 'text', label: 'Middle Name'}
		};
		
		res.json(meta);
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;
