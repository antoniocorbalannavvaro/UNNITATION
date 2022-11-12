const database = new Map();

database.set('topo@gmail.com', '1234');
database.set('david@gmail.com', '4321');
database.set('pablo@uxing.es', '1234');

export default (req, res) => {
	if (!(req.query && 'username' in req.query && 'password' in req.query))
	{
		res.send({ error: true, reason: 'Invalid request.' });
		return;
	}
	
	const password = database.get(req.query.username);
	
	if (password === undefined)
	{
		res.send({ error: true, reason: `User ${req.query.username} does not exist.` });
		return;
	}
	
	if (req.query.password !== password)
	{
		res.send({ error: true, reason: 'Invalid password.' });
		return;
	}
	
	res.send({ error: false });
};
