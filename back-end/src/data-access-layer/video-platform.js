const EnumTranslator = require('./enum-translator');

const enumTranslator = new EnumTranslator([
	[ 'GOOGLE_MEET', 'Google Meet' ],
	[ 'ZOOM', 'Zoom' ],
	[ 'MICROSOFT_TEAMS', 'Microsoft Teams' ]
]);

module.exports = enumTranslator;
