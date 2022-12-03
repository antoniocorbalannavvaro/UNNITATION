const { AppError } = require('./app-error');

class AnnotationEventError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class InvalidInstantAnnotationEventError extends AnnotationEventError
{
	constructor(instant, annotationDuration)
	{
		super(`Invalid instant ${instant} for an annotation with duration ${annotationDuration}`);
		this.name = this.constructor.name;
	}
}

class InvalidLabelAnnotationEventError extends AnnotationEventError
{
	constructor(experimentId, labelId)
	{
		super(`Invalid label id ${labelId} for the experiment id ${experimentId} inside an annotation event`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	AnnotationEventError,
	InvalidInstantAnnotationEventError,
	InvalidLabelAnnotationEventError
};
