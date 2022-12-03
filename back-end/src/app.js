const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const appUserSession = require('api/middleware/app-user-session');

/* API routes */
const userRouter = require('api/user');
const invitationRouter = require('api/invitation');
const labelRouter = require('api/label');
const videoRouter = require('api/video');
const experimentRouter = require('api/experiment');
const annotationRouter = require('api/annotation');
const metaRouter = require('api/meta')

const app = express();

/* Middleware */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(appUserSession(10, (process.env['NODE_ENVIRONMENT'] === 'development') ? 4 : 64));

/* API routes */
app.use('/user', userRouter);
app.use('/invitation', invitationRouter);
app.use('/label', labelRouter);
app.use('/video', videoRouter);
app.use('/experiment', experimentRouter);
app.use('/annotation', annotationRouter);
app.use('/meta', metaRouter);

/* Not found handler */
app.use((req, res, next) => {
	next(createError(404));
});

/* Error handler */
app.use((err, req, res, next) => {
	next;
	console.error(err);
	
	if (process.env['NODE_ENVIRONMENT'] === 'development')
	{
		res.send({ error: true, message: err.message });
	}
	else
	{
		res.json({ error: true });
	}
});

app.listen(3001, 'localhost');
