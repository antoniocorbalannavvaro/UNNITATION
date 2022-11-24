import util from 'util';

export class AppError extends Error
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

export class SingleRowError extends AppError
{
	constructor()
	{
		super('The result of the query violates the single row constraint');
		this.name = this.constructor.name;
	}
}

export class InvalidQueryParametersError extends AppError
{
	constructor(params)
	{
		super(`Invalid query parameters (${util.inspect(params)})`);
		this.name = this.constructor.name;
	}
}

export class InvalidRequestError extends AppError
{
	constructor(req)
	{
		super('Invalid request');
		this.name = this.constructor.name;
	}
}

export class InvalidLoginError extends AppError
{
	constructor(userEmail, password)
	{
		super(`Invalid password '${password}' for user ${userEmail}`);
		this.name = this.constructor.name;
	}
}

export class UserInfoError extends AppError
{
	constructor(userId)
	{
		super(`Error getting information from user id ${userId}`);
		this.name = this.constructor.name;
	}
}

export class InvalidAuthenticationError extends AppError
{
	constructor()
	{
		super('Invalid authentication');
		this.name = this.constructor.name;
	}
}

export class NoSessionTokenError extends AppError
{
	constructor()
	{
		super('No session token provided');
		this.name = this.constructor.name;
	}
}

export class InvalidSessionTokenError extends AppError
{
	constructor(sessionId)
	{
		super(`Invalid session token ${sessionId}`);
		this.name = this.constructor.name;
	}
}

export class SessionExpiredError extends AppError
{
	constructor(sessionId)
	{
		super(`Session '${sessionId}' expired`);
		this.name = this.constructor.name;
	}
}

