import AppError from './app-error';

export default class AppUserError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

export class InvalidInvitationError extends AppUserError
{
	constructor(invitationToken)
	{
		super(`Invalid invitation: ${invitationToken}`);
		this.name = this.constructor.name;
	}
}

export class AlreadyRegisteredError extends AppUserError
{
	constructor(userId)
	{
		super(`The user ${userId} has been already registered`);
		this.name = this.constructor.name;
	}
}
