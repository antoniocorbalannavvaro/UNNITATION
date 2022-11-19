export class AppError extends Error
{
	constructor(message)
	{
		super(message);
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

