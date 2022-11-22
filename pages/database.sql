DROP TABLE IF EXISTS experiment_app_user;
DROP TABLE IF EXISTS annotation_event;
DROP TABLE IF EXISTS annotation;
DROP TABLE IF EXISTS experiment_label;
DROP TABLE IF EXISTS label;
DROP TABLE IF EXISTS video_experiment;
DROP TABLE IF EXISTS video;
DROP TABLE IF EXISTS experiment;
DROP TABLE IF EXISTS app_user_user_role;
DROP TABLE IF EXISTS app_user_language;
ALTER TABLE app_user DROP CONSTRAINT fk_app_user_created_by;
DROP TABLE IF EXISTS app_user;

DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS department;
DROP TYPE IF EXISTS gender;
DROP TYPE IF EXISTS language_enum;
DROP TYPE IF EXISTS video_platform;

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
	password VARCHAR(128) NOT NULL,		-- FIXME: this should be a hash
	completed_date TIMESTAMPTZ NULL,
	first_name VARCHAR(64) NULL,
	middle_name VARCHAR(64) NULL,
	last_name VARCHAR(64) NULL,
	gender gender NULL,
	department department NULL,
	created_by INTEGER NULL,
	CHECK(completed_date IS NULL OR (
		first_name IS NOT NULL AND
		last_name IS NOT NULL AND
		gender IS NOT NULL AND
		department IS NOT NULL
	))
);
ALTER TABLE app_user ADD CONSTRAINT fk_app_user_created_by FOREIGN KEY (created_by) REFERENCES app_user(id);

CREATE TABLE app_user_language(
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
	name VARCHAR(128) NOT NULL,
	chunk_time INTERVAL NOT NULL, CHECK(chunk_time > '10 seconds'::INTERVAL),
	app_user_id INTEGER NOT NULL,
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE video(
	id SERIAL PRIMARY KEY,
	name VARCHAR(128) NOT NULL,
	url VARCHAR(512) NOT NULL,
	transcript_url VARCHAR(512),
	num_actors INTEGER, CHECK(num_actors > 1),
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
	emoji_unicode CHAR(1) NOT NULL,
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
	id SERIAL PRIMARY KEY,
	chunk_num INTEGER NOT NULL,
	video_id INTEGER NOT NULL,
	experiment_id INTEGER NOT NULL,
	app_user_id INTEGER NOT NULL,
	FOREIGN KEY (video_id, experiment_id) REFERENCES video_experiment(video_id, experiment_id),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE annotation_event(
	id SERIAL PRIMARY KEY,
	instant INTERVAL NOT NULL,
	annotation_id INTEGER NOT NULL,
	label_id INTEGER NOT NULL,
	FOREIGN KEY (annotation_id) REFERENCES annotation(id),
	FOREIGN KEY (label_id) REFERENCES label(id)
);

CREATE TABLE experiment_app_user(
	id SERIAL PRIMARY KEY,
	experiment_id INTEGER NOT NULL,
	app_user_id INTEGER NOT NULL,
	FOREIGN KEY (experiment_id) REFERENCES experiment(id),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

