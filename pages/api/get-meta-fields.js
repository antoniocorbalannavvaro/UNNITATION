export default (req, res) => {
	res.send({
		url: { type: 'text', label: 'URL' },
		transcriptUrl: { type: 'text', label: 'Transcript URL' },
		numActors: { type: 'number', label: 'Participants' },
		videoDate: { type: 'datetime', label: 'Video date' },
		platform: { type: 'select', label: 'Platform', options: ['GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS'] },
		language: { type: 'select', label: 'Language', options: ['SPANISH', 'ENGLISH', 'INDIAN', 'CHINESE'] },
		gender: { type: 'select', label: 'Gender', options: ['MALE', 'FEMALE', 'TRANS', 'NON_BINARY', 'NOT_APPLICABLE'] },
		departament: { type: 'select',  label: 'Departament', options: ['SALES', 'ENGINEERING', 'SUPPORT', 'CALL_CENTER'] },
		userRole: { type: 'select', label: 'Role', options: ['ADMINISTRATOR', 'DATA_SCIENTIST', 'ANNOTATOR'] }
	});
};
