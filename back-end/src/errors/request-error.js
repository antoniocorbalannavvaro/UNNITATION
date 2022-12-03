const util = require('util');
const { AppError } = require('./app-error');

class RequestError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class InvalidRequestError extends RequestError
{
	constructor(req)
	{
		super(`Invalid request: ${util.inspect(req.body)}`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	RequestError,
	InvalidRequestError
};
