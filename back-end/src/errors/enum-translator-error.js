const { AppError } = require('./app-error');

class EnumTranslatorError extends AppError
{
	constructor(message)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

class ModelNameNotFoundError extends EnumTranslatorError
{
	constructor(enumName, modelName)
	{
		super(`Model name '${modelName}' not found in enum ${enumName}`);
		this.name = this.constructor.name;
	}
}

class LogicNameNotFoundError extends EnumTranslatorError
{
	constructor(enumName, logicName)
	{
		super(`Logic name '${logicName}' not found in enum ${enumName}`);
		this.name = this.constructor.name;
	}
}

class DuplicatedModelNameError extends EnumTranslatorError
{
	constructor(enumName, modelName)
	{
		super(`Model name '${modelName}' already exists in enum ${enumName}`);
		this.name = this.constructor.name;
	}
}

class DuplicatedLogicNameError extends EnumTranslatorError
{
	constructor(enumName, logicName)
	{
		super(`Logic name '${logicName}' already exists in enum ${enumName}`);
		this.name = this.constructor.name;
	}
}

module.exports = {
	EnumTranslatorError,
	ModelNameNotFoundError,
	LogicNameNotFoundError,
	DuplicatedModelNameError,
	DuplicatedLogicNameError
};
