DROP TABLE IF EXISTS app_user_session;

CREATE TABLE app_user_session(
	token CHAR(128) PRIMARY KEY,
	lately_accessed TIMESTAMPTZ NOT NULL,
	app_user_id INTEGER UNIQUE NOT NULL,
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

