-- Enumerators

CREATE TYPE video_platform AS ENUM ('GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS');
CREATE TYPE language_enum AS ENUM ('SPANISH', 'ENGLISH', 'INDIAN', 'CHINESE');
CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'TRANS', 'NON_BINARY', 'NOT_APPLICABLE');
CREATE TYPE department AS ENUM ('SALES', 'ENGINEERING', 'SUPPORT', 'CALL_CENTER');
CREATE TYPE user_role AS ENUM ('ADMINISTRATOR', 'DATA_SCIENTIST', 'ANNOTATOR');

-- Table entities

CREATE TABLE app_user(
	id SERIAL PRIMARY KEY,
	email VARCHAR(128) UNIQUE NOT NULL,
	password VARCHAR(128) NULL,		-- FIXME: this should be a hash
	annotation_dedication_time INTEGER NULL,
	completed_date TIMESTAMPTZ NULL,
	first_name VARCHAR(64) NULL,
	middle_name VARCHAR(64) NULL,
	last_name VARCHAR(64) NULL,
	birth_date TIMESTAMPTZ NULL,
	gender gender NULL,
	department department NULL,
	created_by INTEGER NULL,
	CHECK(completed_date IS NULL OR (
		password IS NOT NULL AND
		first_name IS NOT NULL AND
		last_name IS NOT NULL AND
		birth_date IS NOT NULL AND
		gender IS NOT NULL AND
		department IS NOT NULL
	))
);
ALTER TABLE app_user ADD CONSTRAINT fk_app_user_created_by FOREIGN KEY (created_by) REFERENCES app_user(id);

CREATE TABLE invitation(
	token CHAR(128) PRIMARY KEY,
	app_user_id INTEGER UNIQUE NOT NULL,
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE app_user_language(
	is_main BOOL NOT NULL,
	language language_enum NOT NULL,
	app_user_id INTEGER NOT NULL,
	PRIMARY KEY (app_user_id, language),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE app_user_user_role(
	user_role user_role NOT NULL,
	app_user_id INTEGER NOT NULL,
	PRIMARY KEY (app_user_id, user_role),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE experiment(
	id SERIAL PRIMARY KEY,
	name VARCHAR(128) UNIQUE NOT NULL,
	aborted_date TIMESTAMPTZ NULL,
	app_user_id INTEGER NOT NULL,
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE video(
	id SERIAL PRIMARY KEY,
	name VARCHAR(128) NOT NULL,
	url VARCHAR(512) UNIQUE NOT NULL,
	transcript_url VARCHAR(512),
	duration INTERVAL NOT NULL,
	sales_meeting BOOL,
	actors_involved BOOL,
	video_date TIMESTAMPTZ NOT NULL,
	upload_date TIMESTAMPTZ NOT NULL,
	platform video_platform NOT NULL,
	language language_enum NOT NULL,
	app_user_id INTEGER NOT NULL,
	new_version_video_id INTEGER,
	FOREIGN KEY (app_user_id) REFERENCES app_user(id),
	FOREIGN KEY (new_version_video_id) REFERENCES video(id)
);

CREATE TABLE video_experiment(
	video_id INTEGER NOT NULL,
	experiment_id INTEGER NOT NULL,
	PRIMARY KEY (video_id, experiment_id),
	FOREIGN KEY (video_id) REFERENCES video(id),
	FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

CREATE TABLE label(
	id SERIAL PRIMARY KEY,
	name VARCHAR(32) UNIQUE NOT NULL,
	emoji_unicode VARCHAR(4) NOT NULL,
	app_user_id INTEGER NOT NULL,
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE experiment_label(
	experiment_id INTEGER NOT NULL,
	label_id INTEGER NOT NULL,
	PRIMARY KEY (experiment_id, label_id),
	FOREIGN KEY (experiment_id) REFERENCES experiment(id),
	FOREIGN KEY (label_id) REFERENCES label(id)
);

CREATE TABLE annotation(
	chunk_url VARCHAR(256) NOT NULL,
	start_interval INTERVAL NOT NULL,
	duration INTERVAL NOT NULL,
	completed_date TIMESTAMPTZ NULL,
	video_id INTEGER NOT NULL,
	experiment_id INTEGER NOT NULL,
	app_user_id INTEGER NOT NULL,
	PRIMARY KEY (start_interval, video_id, experiment_id, app_user_id),
	FOREIGN KEY (video_id, experiment_id) REFERENCES video_experiment(video_id, experiment_id),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE annotation_event(
	instant INTERVAL NOT NULL,
	
	start_interval INTERVAL NOT NULL,
	video_id INTEGER NOT NULL,
	experiment_id INTEGER NOT NULL,
	app_user_id INTEGER NOT NULL,
	
	label_id INTEGER NOT NULL,
	
	PRIMARY KEY (instant, start_interval, video_id, experiment_id, app_user_id),
	FOREIGN KEY (start_interval, video_id, experiment_id, app_user_id) REFERENCES annotation(start_interval, video_id, experiment_id, app_user_id),
	FOREIGN KEY (label_id) REFERENCES label(id)
);

CREATE TABLE experiment_app_user(
	experiment_id INTEGER NOT NULL,
	app_user_id INTEGER NOT NULL,
	PRIMARY KEY(experiment_id, app_user_id),
	FOREIGN KEY (experiment_id) REFERENCES experiment(id),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

