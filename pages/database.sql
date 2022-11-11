DROP TABLE IF EXISTS AnnotationEvent;
DROP TABLE IF EXISTS Annotation;
DROP TABLE IF EXISTS ExperimentLabel;
DROP TABLE IF EXISTS Label;
DROP TABLE IF EXISTS VideoExperiment;
DROP TABLE IF EXISTS Video;
DROP TABLE IF EXISTS Experiment;
DROP TABLE IF EXISTS UserInfo;
DROP TABLE IF EXISTS SecondaryLanguage;
DROP TABLE IF EXISTS Annotator;
ALTER TABLE AppUser DROP CONSTRAINT fk_appuser_administrator;
DROP TABLE IF EXISTS Administrator;
DROP TABLE IF EXISTS DataScientist;
DROP TABLE IF EXISTS AppUser;

DROP TYPE IF EXISTS Departament;
DROP TYPE IF EXISTS Gender;
DROP TYPE IF EXISTS LanguageLevel;
DROP TYPE IF EXISTS LanguageEnum;
DROP TYPE IF EXISTS VideoPlatform;

-- Enumerators

CREATE TYPE VideoPlatform AS ENUM ('GOOGLE_MEET', 'ZOOM', 'MICROSOFT_TEAMS');
CREATE TYPE LanguageEnum AS ENUM ('SPANISH', 'ENGLISH', 'INDIAN', 'CHINESE');
CREATE TYPE LanguageLevel AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE');
CREATE TYPE Gender AS ENUM ('MALE', 'FEMALE', 'TRANS', 'NON_BINARY', 'NOT_APPLICABLE');
CREATE TYPE Departament AS ENUM ('SALES', 'ENGINEERING', 'SUPPORT', 'CALL_CENTER');

-- Table entities

CREATE TABLE AppUser(id SERIAL PRIMARY KEY, email VARCHAR(128) NOT NULL, createdBy INTEGER);
CREATE TABLE DataScientist(id SERIAL PRIMARY KEY, parentId INTEGER NOT NULL, FOREIGN KEY (parentId) REFERENCES AppUser(id));
CREATE TABLE Administrator(id SERIAL PRIMARY KEY, parentId INTEGER NOT NULL, FOREIGN KEY (parentId) REFERENCES AppUser(id));
ALTER TABLE AppUser ADD CONSTRAINT fk_appuser_administrator FOREIGN KEY (createdBy) REFERENCES Administrator(id);
CREATE TABLE Annotator(id SERIAL PRIMARY KEY, weeklyGoal INTERVAL NOT NULL, parentId INTEGER NOT NULL, FOREIGN KEY (parentId) REFERENCES AppUser(id));

CREATE TABLE SecondaryLanguage(id SERIAL PRIMARY KEY, language LanguageEnum NOT NULL, level LanguageLevel NOT NULL);
CREATE TABLE UserInfo(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	middleName VARCHAR(64),
	lastName VARCHAR(64) NOT NULL,
	mainLanguage LanguageEnum NOT NULL,
	secondaryLanguage SecondaryLanguage,
	gender Gender NOT NULL,
	departament Departament NOT NULL,
	appUserId INTEGER NOT NULL,
	FOREIGN KEY (appUserId) REFERENCES AppUser(id)
);

CREATE TABLE Experiment(id SERIAL PRIMARY KEY, administratorId INTEGER NOT NULL, FOREIGN KEY (administratorId) REFERENCES Administrator (id));

CREATE TABLE Video(
	id SERIAL PRIMARY KEY,
	name VARCHAR(128) NOT NULL,
	platform VideoPlatform NOT NULL,
	language LanguageEnum NOT NULL,
	dataScientistId INTEGER NOT NULL,
	FOREIGN KEY (dataScientistId) REFERENCES DataScientist(id)
);

CREATE TABLE VideoExperiment(
	id SERIAL PRIMARY KEY,
	videoId INTEGER NOT NULL,
	experimentId INTEGER NOT NULL,
	FOREIGN KEY (videoId) REFERENCES Video(id),
	FOREIGN KEY (experimentId) REFERENCES Experiment(id)
);

CREATE TABLE Label(id SERIAL PRIMARY KEY, name VARCHAR(32));

CREATE TABLE ExperimentLabel(
	id SERIAL PRIMARY KEY,
	experimentId INTEGER NOT NULL,
	labelId INTEGER NOT NULL,
	FOREIGN KEY (experimentId) REFERENCES Experiment(id),
	FOREIGN KEY (labelId) REFERENCES Label(id)
);

CREATE TABLE Annotation(
	id SERIAL PRIMARY KEY,
	videoExperimentId INTEGER NOT NULL,
	annotatorId INTEGER NOT NULL,
	FOREIGN KEY (videoExperimentId) REFERENCES VideoExperiment(id),
	FOREIGN KEY (annotatorId) REFERENCES Annotator(id)
);

CREATE TABLE AnnotationEvent(
	id SERIAL PRIMARY KEY,
	instant INTERVAL NOT NULL,
	annotationId INTEGER NOT NULL,
	labelId INTEGER NOT NULL,
	FOREIGN KEY (annotationId) REFERENCES Annotation(id),
	FOREIGN KEY (labelId) REFERENCES Label(id)
);

