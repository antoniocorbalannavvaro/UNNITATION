import util from 'util';
import AppError from './app-error';

export default class RequestError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

export class InvalidRequestError extends RequestError
{
	constructor(req)
	{
		super(`Invalid request: ${util.inspect(req.body)}`);
		this.name = this.constructor.name;
	}
}
