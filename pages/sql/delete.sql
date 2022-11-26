DROP TABLE IF EXISTS app_user_session;

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
DROP TABLE IF EXISTS invitation;
ALTER TABLE app_user DROP CONSTRAINT fk_app_user_created_by;
DROP TABLE IF EXISTS app_user;

DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS department;
DROP TYPE IF EXISTS gender;
DROP TYPE IF EXISTS language_enum;
DROP TYPE IF EXISTS video_platform;
