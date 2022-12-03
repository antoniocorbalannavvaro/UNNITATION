const assert = require('assert');
const EnumTranslator = require('data-access-layer/enum-translator');
const { ModelNameNotFoundError, LogicNameNotFoundError, DuplicatedModelNameError, DuplicatedLogicNameError } = require('errors/enum-translator-error');

const enumTranslator = new EnumTranslator('Greetings', [
	[ 'HELLO', 'Hello' ],
	[ 'BYE', 'bye bye' ],
	[ 'NOTHING', 'nothing never' ]
]);

assert.strictEqual(enumTranslator.fromModel('Hello'), 'HELLO');
assert.strictEqual(enumTranslator.fromModel('bye bye'), 'BYE');
assert.strictEqual(enumTranslator.fromModel('nothing never'), 'NOTHING');

assert.strictEqual(enumTranslator.toModel('HELLO'), 'Hello');
assert.strictEqual(enumTranslator.toModel('BYE'), 'bye bye');
assert.strictEqual(enumTranslator.toModel('NOTHING'), 'nothing never');

try
{
	enumTranslator.fromModel('HELLO');
	assert.fail();
}
catch (err)
{
	assert(err instanceof ModelNameNotFoundError);
}

try
{
	enumTranslator.toModel('bye bye');
	assert.fail();
}
catch (err)
{
	assert(err instanceof LogicNameNotFoundError);
}

try
{
	new EnumTranslator('Greetings', [
		[ 'HELLO', 'Hello' ],
		[ 'BYE', 'bye bye' ],
		[ 'NOTHING', 'nothing never' ],
		[ 'SEE_YOU', 'bye bye' ]
	]);
	
	assert.fail();
}
catch (err)
{
	assert(err instanceof DuplicatedModelNameError);
}

try
{
	new EnumTranslator('Greetings', [
		[ 'HELLO', 'Hello' ],
		[ 'BYE', 'bye bye' ],
		[ 'NOTHING', 'nothing never' ],
		[ 'BYE', 'see you again' ]
	]);
	
	assert.fail();
}
catch (err)
{
	assert(err instanceof DuplicatedLogicNameError);
}


