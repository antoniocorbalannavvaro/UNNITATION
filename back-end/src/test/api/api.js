const assert = require('assert');
const querystring = require('querystring');
const http = require('http');

const SESSION_ID_COOKIE_LABEL = 'SESSION_ID';

let host = 'localhost';
let port = 3000;

if (process.env['APP_HOST'])
	host = process.env['APP_HOST'];

if (process.env['APP_PORT'])
	port = parseInt(process.env['APP_PORT']);

let sessionId = undefined;

function get(path, query)
{
	return new Promise((resolve) => {
		if (query !== undefined)
			path += '?' + querystring.stringify(query);
		
		const headers = {};
		
		if (sessionId !== undefined)
			headers.cookie = `${SESSION_ID_COOKIE_LABEL}=${sessionId}`;
		
		http.request({ method: 'GET', path: path, host, port, headers }, (res) => {
			const cookies = res.headers['set-cookie'];
			
			for (const cookie of cookies)
			{
				const props = cookie.split('; ');
				
				for (const prop of props)
				{
					const pair = prop.split('=');
					
					if (pair[0] === SESSION_ID_COOKIE_LABEL)
					{
						if (pair[1] === '')
							sessionId = undefined;
						else
							sessionId = pair[1];
					}
				}
			}
			
			assert(/application\/json/.test(res.headers['content-type']));
			let resText = '';
			res.setEncoding('utf8');
			res.on('data', (data) => { resText += data; });
			res.on('end', () => {
				const obj = JSON.parse(resText);
				console.dir(obj, { depth: Infinity });
				resolve(obj);
			});
		}).end();
	});
}

function post(path, body)
{
	return new Promise((resolve) => {
		const headers = { 'content-type': 'application/json' };
		
		if (sessionId !== undefined)
			headers.cookie = `${SESSION_ID_COOKIE_LABEL}=${sessionId}`;
		
		const req = http.request({ method: 'POST', path: path, host, port, headers }, (res) => {
			assert(/application\/json/.test(res.headers['content-type']));
			let resText = '';
			res.setEncoding('utf8');
			res.on('data', (data) => { resText += data; });
			res.on('end', () => {
				const obj = JSON.parse(resText);
				console.dir(obj, { depth: Infinity });
				resolve(obj);
			});
		});
		
		if (body !== undefined)
			req.write(JSON.stringify(body));
		
		req.end();
	});
}

module.exports = { get, post };
