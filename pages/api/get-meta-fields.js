export default (req, res) => {
	res.send({
		url: { type: 'text', label: 'URL' },
		transcriptUrl: { type: 'text', label: 'Transcript URL' },
		numActors: { type: 'number', label: 'Participants' },
		videoDate: { type: 'datetime', label: 'Video date' },
		platform: { type: 'select', label: 'Platform', options: ['GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS'] },
		language: { type: 'select', label: 'Language', options: ['SPANISH', 'ENGLISH', 'INDIAN', 'CHINESE'] },
		languageLevel: { type: 'select', label: 'Language level', options: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE'] },
		gender: { type: 'select', label: 'Gender', options: ['MALE', 'FEMALE', 'TRANS', 'NON_BINARY', 'NOT_APPLICABLE'] },
		departament: { type: 'select',  label: 'Departament', options: ['SALES', 'ENGINEERING', 'SUPPORT', 'CALL_CENTER'] }
	});
};
