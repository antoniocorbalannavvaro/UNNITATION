import {Pool} from 'pg';

const pool = new Pool({
	user: process.env.USER,
	password: '12345678',
	database: 'unnitation',
	host: 'localhost',
	port: 5432
});

pool.on('error', (err) => {
	console.error(err);
	process.exit(-1);
});

export default pool;
