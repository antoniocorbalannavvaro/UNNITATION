export default (req, res) => {
	const { enum_name } = req.query;
	
	let result = null;
	
	/* FIXME: get this data from the database */
	switch (enum_name)
	{
		case 'video_platform':
			result = ['GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS'];
			break;
		
		case 'language_enum':
			result = ['SPANISH', 'ENGLISH', 'INDIAN', 'CHINESE'];
			break;
		
		case 'gender':
			result = ['MALE', 'FEMALE', 'TRANS', 'NON_BINARY', 'NOT_APPLICABLE'];
			break;
		
		case 'department':
			result = ['SALES', 'ENGINEERING', 'SUPPORT', 'CALL_CENTER'];
			break;
		
		case 'user_role':
			result = ['ADMINISTRATOR', 'DATA_SCIENTIST', 'ANNOTATOR'];
			break;
		
	}
	
	res.json(result);
}
