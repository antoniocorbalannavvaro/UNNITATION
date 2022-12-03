const { AppError } = require('./app-error');

class VideoError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class VideoIdDoesNotExistsError extends VideoError
{
	constructor(videoId)
	{
		super(`Video with id ${videoId} does not exist`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	VideoError,
	VideoIdDoesNotExistsError
};
