const { AppError } = require('./app-error');

class AppUserError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class InvalidInvitationError extends AppUserError
{
	constructor(invitationToken)
	{
		super(`Invalid invitation: ${invitationToken}`);
		this.name = this.constructor.name;
	}
}

class AlreadyRegisteredError extends AppUserError
{
	constructor(userId)
	{
		super(`The user ${userId} has been already registered`);
		this.name = this.constructor.name;
	}
}

class InvalidLoginError extends AppUserError
{
	constructor(email, password)
	{
		super(`Login failed for user ${email}. Password: ${password}`);
		this.name = this.constructor.name;
	}
}

class AppUserDoesNotExistError extends AppUserError
{
	constructor(userId)
	{
		super(`User with id ${userId} does not exist`);
		this.name = this.constructor.name;
	}
}

class AppUserEmailDoesNotExistError extends AppUserError
{
	constructor(email)
	{
		super(`User with email ${email} does not exist`);
		this.name = this.constructor.name;
	}
}

class NotLoggedInError extends AppUserError
{
	constructor()
	{
		super('User not logged in');
		this.name = this.constructor.name;
	}
}

class InvalidUserRoleError extends AppUserError
{
	constructor(userId)
	{
		super(`User ${userId} has an invalid role for the action required`);
		this.name = this.constructor.name;
	}
}

class NotUniqueMainLanguageError extends AppUserError
{
	constructor(userId)
	{
		super(`User ${userId} does not have a unique main language`);
		this.name = this.constructor.name;
	}
}

class NoCurrentExperimentAppUserError extends AppUserError
{
	constructor(userId)
	{
		super(`User ${userId} is not currently within a experiment`);
		this.name = this.constructor.name;
	}
}

/* XXX: by design, this should not happen NEVER */
class MoreThanOneCurrentExperimentAppUserError extends AppUserError
{
	constructor(userId)
	{
		super(`User ${userId} is in more than one experiment`);
		this.name = this.constructor.name;
	}
}

class AlreadyInAExperimentError extends AppUserError
{
	constructor(userId, experimentId)
	{
		super(`User ${userId} is already within the experiment with id ${experimentId}`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	AppUserError,
	InvalidInvitationError,
	AlreadyRegisteredError,
	InvalidLoginError,
	AppUserDoesNotExistError,
	AppUserEmailDoesNotExistError,
	NotLoggedInError,
	InvalidUserRoleError,
	NotUniqueMainLanguageError,
	NoCurrentExperimentAppUserError,
	MoreThanOneCurrentExperimentAppUserError,
	AlreadyInAExperimentError
};

