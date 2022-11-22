DROP TABLE IF EXISTS experiment_annotator;
DROP TABLE IF EXISTS annotation_event;
DROP TABLE IF EXISTS annotation;
DROP TABLE IF EXISTS experiment_label;
DROP TABLE IF EXISTS label;
DROP TABLE IF EXISTS video_experiment;
DROP TABLE IF EXISTS video;
DROP TABLE IF EXISTS experiment;
DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS secondary_language;
DROP TABLE IF EXISTS annotator;
ALTER TABLE app_user DROP CONSTRAINT fk_appuser_administrator;
DROP TABLE IF EXISTS administrator;
DROP TABLE IF EXISTS data_scientist;
DROP TABLE IF EXISTS app_user;

DROP TYPE IF EXISTS department;
DROP TYPE IF EXISTS gender;
DROP TYPE IF EXISTS language_level;
DROP TYPE IF EXISTS language_enum;
DROP TYPE IF EXISTS video_platform;

-- Enumerators

CREATE TYPE video_platform AS ENUM ('GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS');
CREATE TYPE language_enum AS ENUM ('SPANISH', 'ENGLISH', 'INDIAN', 'CHINESE');
CREATE TYPE language_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE');
CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'TRANS', 'NON_BINARY', 'NOT_APPLICABLE');
CREATE TYPE department AS ENUM ('SALES', 'ENGINEERING', 'SUPPORT', 'CALL_CENTER');

-- Table entities

CREATE TABLE app_user(
	id SERIAL PRIMARY KEY,
	email VARCHAR(128) UNIQUE NOT NULL,
	password VARCHAR(128) NOT NULL,		-- FIXME: this should be a hash
	created_by INTEGER
);

CREATE TABLE data_scientist(
	id SERIAL PRIMARY KEY,
	parent_id INTEGER NOT NULL,
	FOREIGN KEY (parent_id) REFERENCES app_user(id)
);

CREATE TABLE administrator(
	id SERIAL PRIMARY KEY,
	parent_id INTEGER NOT NULL,
	FOREIGN KEY (parent_id) REFERENCES app_user(id)
);
ALTER TABLE app_user ADD CONSTRAINT fk_appuser_administrator FOREIGN KEY (created_by) REFERENCES administrator(id);

CREATE TABLE annotator(
	id SERIAL PRIMARY KEY,
	parent_id INTEGER NOT NULL,
	FOREIGN KEY (parent_id) REFERENCES app_user(id)
);

CREATE TABLE secondary_language(
	id SERIAL PRIMARY KEY,
	language language_enum NOT NULL,
	level language_level NOT NULL
);

CREATE TABLE user_info(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	middle_name VARCHAR(64),
	last_name VARCHAR(64) NOT NULL,
	main_language language_enum NOT NULL,
	gender gender NOT NULL,
	department department NOT NULL,
	secondary_language_id INTEGER,
	app_user_id INTEGER NOT NULL,
	FOREIGN KEY (secondary_language_id) REFERENCES secondary_language(id),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id)
);

CREATE TABLE experiment(
	id SERIAL PRIMARY KEY,
	name VARCHAR(128) NOT NULL,
	chunk_time INTERVAL NOT NULL, CHECK(chunk_time > '10 seconds'::INTERVAL),
	administrator_id INTEGER NOT NULL,
	FOREIGN KEY (administrator_id) REFERENCES administrator (id)
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
	data_scientist_id INTEGER NOT NULL,
	new_version_video_id INTEGER,
	FOREIGN KEY (data_scientist_id) REFERENCES data_scientist(id),
	FOREIGN KEY (new_version_video_id) REFERENCES video(id)
);

CREATE TABLE video_experiment(
	id SERIAL PRIMARY KEY,
	video_id INTEGER NOT NULL,
	experiment_id INTEGER NOT NULL,
	FOREIGN KEY (video_id) REFERENCES video(id),
	FOREIGN KEY (experiment_id) REFERENCES experiment(id)
);

CREATE TABLE label(
	id SERIAL PRIMARY KEY,
	name VARCHAR(32) UNIQUE NOT NULL,
	emoji_unicode CHAR(1) NOT NULL,
	created_by INTEGER NOT NULL,
	FOREIGN KEY (created_by) REFERENCES administrator(id)
);

CREATE TABLE experiment_label(
	id SERIAL PRIMARY KEY,
	experiment_id INTEGER NOT NULL,
	label_id INTEGER NOT NULL,
	FOREIGN KEY (experiment_id) REFERENCES experiment(id),
	FOREIGN KEY (label_id) REFERENCES label(id)
);

CREATE TABLE annotation(
	id SERIAL PRIMARY KEY,
	chunk_num INTEGER NOT NULL,
	video_experiment_id INTEGER NOT NULL,
	annotator_id INTEGER NOT NULL,
	FOREIGN KEY (video_experiment_id) REFERENCES video_experiment(id),
	FOREIGN KEY (annotator_id) REFERENCES annotator(id)
);

CREATE TABLE annotation_event(
	id SERIAL PRIMARY KEY,
	instant INTERVAL NOT NULL,
	annotation_id INTEGER NOT NULL,
	label_id INTEGER NOT NULL,
	FOREIGN KEY (annotation_id) REFERENCES annotation(id),
	FOREIGN KEY (label_id) REFERENCES label(id)
);

CREATE TABLE experiment_annotator(
	id SERIAL PRIMARY KEY,
	experiment_id INTEGER NOT NULL,
	annotator_id INTEGER NOT NULL,
	FOREIGN KEY (experiment_id) REFERENCES experiment(id),
	FOREIGN KEY (annotator_id) REFERENCES annotator(id)
);

