const { AppError } = require('./app-error');

class LabelError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class LabelNotFoundError extends LabelError
{
	constructor(experimentId)
	{
		super(`Label ${experimentId} not found`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	LabelError,
	LabelNotFoundError
};
