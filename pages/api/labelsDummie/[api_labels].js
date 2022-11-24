export default (req, res) => {
	const { api_labels } = req.query;
	
	let result = {
        'happyness':'😋',
        'sadness': '😔',
        'heresitation': '🤔',
                };

	/* FIXME: get this data from the database */
	switch (api_labels)
	{
		case 'labels':
			result;
			break;
	}
	
	res.json(result);
}
