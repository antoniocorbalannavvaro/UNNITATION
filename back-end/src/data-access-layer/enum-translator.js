const { ModelNameNotFoundError, LogicNameNotFoundError, DuplicatedModelNameError, DuplicatedLogicNameError } = require('errors/enum-translator-error');

class EnumTranslator
{
	constructor(enumName, translations)
	{
		this.enumName = enumName;
		
		this.logicToModelNames = new Map();
		this.modelToLogicNames = new Map();
		
		for (const pair of translations)
		{
			const logicName = pair[0];
			const modelName = pair[1];
			
			if (this.logicToModelNames.has(logicName))
				throw new DuplicatedLogicNameError(this.enumName, logicName);
			
			if (this.modelToLogicNames.has(modelName))
				throw new DuplicatedModelNameError(this.enumName, modelName);
			
			this.logicToModelNames.set(logicName, modelName);
			this.modelToLogicNames.set(modelName, logicName);
		}
	}
	
	toModel(logicName)
	{
		const modelName = this.logicToModelNames.get(logicName);
		
		if (modelName === undefined)
			throw new LogicNameNotFoundError(this.enumName, logicName)
		
		return modelName;
	}
	
	fromModel(modelName)
	{
		const logicName = this.modelToLogicNames.get(modelName);
		
		if (logicName === undefined)
			throw new ModelNameNotFoundError(this.enumName, modelName)
		
		return logicName;
	}
}

module.exports = EnumTranslator;
