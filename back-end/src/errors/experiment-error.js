const { AppError } = require('./app-error');

class ExperimentError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class InvalidArgumentsExperimentError extends ExperimentError
{
	constructor(detail)
	{
		super(`Invalid arguments for the experiment: ${detail}`);
		this.name = this.constructor.name;
	}
}

class ExperimentNotFoundError extends ExperimentError
{
	constructor(experimentId)
	{
		super(`Experiment ${experimentId} not found`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	ExperimentError,
	InvalidArgumentsExperimentError,
	ExperimentNotFoundError
};
