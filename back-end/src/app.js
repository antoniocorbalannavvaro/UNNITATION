const fs = require('fs')
const https = require('https');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const appUserSession = require('api/middleware/app-user-session');

/* API routes */
const metaRouter = require('api/meta');
const userRouter = require('api/user');
const invitationRouter = require('api/invitation');
const labelRouter = require('api/label');
const videoRouter = require('api/video');
const experimentRouter = require('api/experiment');
const annotationRouter = require('api/annotation');

const app = express();

/* Middleware */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(appUserSession(10, (process.env['APP_ENVIRONMENT'] === 'development') ? 4 : 64));

app.get('/', (req, res) => {
	res.send('Not found.');
});

/* API routes */
app.use('/meta', metaRouter);
app.use('/user', userRouter);
app.use('/invitation', invitationRouter);
app.use('/label', labelRouter);
app.use('/video', videoRouter);
app.use('/experiment', experimentRouter);
app.use('/annotation', annotationRouter);

/* Not found handler */
app.use((req, res, next) => {
	next(createError(404));
});

/* Error handler */
app.use((err, req, res, next) => {
	next;
	console.error(err);
	
	if (process.env['APP_ENVIRONMENT'] === 'development')
	{
		res.send({ error: true, message: err.message });
	}
	else
	{
		res.json({ error: true });
	}
});

let host = 'localhost';
let port = 3000;
let ssl = false;

if (process.env['APP_HOST'])
	host = process.env['APP_HOST'];

if (process.env['APP_PORT'])
	port = parseInt(process.env['APP_PORT']);

if (process.env['APP_CERT'] && process.env['APP_CERT'])
{
	const srv = https.createServer({
		cert: fs.readFileSync(process.env['APP_CERT'], { encoding: 'utf8' }),
		key: fs.readFileSync(process.env['APP_KEY'], { encoding: 'utf8' }),
	}, app);
	
	srv.listen(port, host);
	
	ssl = true;
}
else
{
	app.listen(port, host);
}

console.log(`App running on ${host}:${port}`);

if (ssl)
	console.log('SSL enabled');
else
	console.log('SSL not enabled');

