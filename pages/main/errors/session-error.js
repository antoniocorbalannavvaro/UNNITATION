import AppError from './app-error';

export default class SessionError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

export class NoSessionProvidedError extends SessionError
{
	constructor()
	{
		super('No session provided');
		this.name = this.constructor.name;
	}
}

export class InvalidSessionError extends SessionError
{
	constructor(session)
	{
		super(`Invalid session: ${session}`);
		this.name = this.constructor.name;
	}
}

export class SessionExpiredError extends SessionError
{
	constructor(session)
	{
		super(`Session expired: ${session}`);
		this.name = this.constructor.name;
	}
}
