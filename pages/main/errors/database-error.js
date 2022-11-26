import AppError from './app-error';

export default class DatabaseError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

export class NoRowsError extends DatabaseError
{
	constructor()
	{
		super('No rows returned from the database');
		this.name = this.constructor.name;
	}
}

export class MultipleRowsError extends DatabaseError
{
	constructor()
	{
		super('Multiple rows returned from the database');
		this.name = this.constructor.name;
	}
}
