const { NotLoggedInError } = require('errors/app-user-error');

module.exports = () => {
	return (req, res, next) => {
		if (req.appUser === undefined)
		{
			next(new NotLoggedInError());
			return;
		}
		
		next();
	}
};
