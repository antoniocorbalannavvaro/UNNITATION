const tests = [ './data-access-layer/enum-translator' ];

for (const test of tests)
{
	process.stdout.write(`Testing module '${test}'...`);
	require(test);
	console.log(' OK');
}
