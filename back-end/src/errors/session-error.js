const { AppError } = require('./app-error');

class SessionError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class NoSessionProvidedError extends SessionError
{
	constructor()
	{
		super('No session provided');
		this.name = this.constructor.name;
	}
}

class InvalidSessionError extends SessionError
{
	constructor(session)
	{
		super(`Invalid session: ${session}`);
		this.name = this.constructor.name;
	}
}

class SessionExpiredError extends SessionError
{
	constructor(session)
	{
		super(`Session expired: ${session}`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	SessionError,
	NoSessionProvidedError,
	InvalidSessionError,
	SessionExpiredError
};
