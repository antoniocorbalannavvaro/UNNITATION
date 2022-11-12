DO $$
DECLARE
	userId AppUser.id%TYPE;
	adminId Administrator.id%TYPE;
	secondaryLanguageId SecondaryLanguage.id%TYPE;
	annotatorId DataScientist.id%TYPE;
	dataScientistId DataScientist.id%TYPE;
	videoId1 Video.id%TYPE;
	videoId2 Video.id%TYPE;
	experimentId Experiment.id%TYPE;
	videoExperimentId1 VideoExperiment.id%TYPE;
	videoExperimentId2 VideoExperiment.id%TYPE;
	annotationId Annotation.id%TYPE;
BEGIN
	-- Create the initial administrator
	INSERT INTO AppUser(email, password) VALUES ('sandra@gmail.com', '1234') RETURNING id INTO userId;
	INSERT INTO Administrator(parentId) VALUES (userId) RETURNING id INTO adminId;
	INSERT INTO SecondaryLanguage(language, level) VALUES ('ENGLISH', 'C2') RETURNING id INTO secondaryLanguageId;
	INSERT INTO UserInfo(name, middleName, lastName, mainLanguage, gender, departament, secondaryLanguageId, appUserId)
		VALUES ('Sandra', 'Giménez', 'Pérez', 'SPANISH', 'FEMALE', 'SALES', secondaryLanguageId, userId);
	
	-- Create an Annotator
	INSERT INTO AppUser(email, password, createdBy) VALUES ('andrea@hotmail.com', '123', adminId) RETURNING id INTO userId;
	INSERT INTO Annotator(parentId) VALUES (userId) RETURNING id INTO annotatorId;
	INSERT INTO SecondaryLanguage(language, level) VALUES ('SPANISH', 'B1') RETURNING id INTO secondaryLanguageId;
	INSERT INTO UserInfo(name, middleName, lastName, mainLanguage, gender, departament, secondaryLanguageId, appUserId)
		VALUES ('Andrea', 'Sánchez', 'López', 'CHINESE', 'FEMALE', 'ENGINEERING', secondaryLanguageId, userId);
	
	-- Create an Data Scientist
	INSERT INTO AppUser(email, password, createdBy) VALUES ('diego@yahoo.com', 'diego123', adminId) RETURNING id INTO userId;
	INSERT INTO DataScientist(parentId) VALUES (userId) RETURNING id INTO dataScientistId;
	INSERT INTO SecondaryLanguage(language, level) VALUES ('SPANISH', 'A1') RETURNING id INTO secondaryLanguageId;
	INSERT INTO UserInfo(name, middleName, lastName, mainLanguage, gender, departament, secondaryLanguageId, appUserId)
		VALUES ('Diego', 'Murillo', 'Egea', 'INDIAN', 'MALE', 'SUPPORT', secondaryLanguageId, userId);
	
	-- A Data Scientist uploads two videos
	INSERT INTO Video(name, url, transcriptUrl, numActors, videoDate, uploadDate, platform, language, dataScientistId)
		VALUES ('Google sales meeting', 'https://amazon.com/some-url/video.mp4', 'https://amazon.com/some-url/transcript.mp4', 5, '2013-11-03 00:00:00+00'::TIMESTAMPTZ, (SELECT NOW()), 'GOOGLE_MEET', 'INDIAN', dataScientistId) RETURNING id INTO videoId1;
	INSERT INTO Video(name, url, transcriptUrl, numActors, videoDate, uploadDate, platform, language, dataScientistId)
		VALUES ('IBM and Sony tech meeting', 'https://amazon.com/some-url/video2.mp4', 'https://amazon.com/some-url/transcript2.mp4', 12, '2015-05-01 06:32:12+00'::TIMESTAMPTZ, (SELECT NOW()), 'MICROSOFT_TEAMS', 'ENGLISH', dataScientistId) RETURNING id INTO videoId2;
	
	-- The administrator creates two labels
	INSERT INTO Label(name, emojiUnicode, createdBy) VALUES ('happy', '😀', adminId);
	INSERT INTO Label(name, emojiUnicode, createdBy) VALUES ('sad', '😔', adminId);
	
	-- The administrator creates an experiment
	INSERT INTO Experiment(name, chunkTime, administratorId) VALUES ('Some experiment name', '10 minutes'::INTERVAL, adminId) RETURNING id INTO experimentId;
	INSERT INTO VideoExperiment(videoId, experimentId) VALUES (videoId1, experimentId) RETURNING id INTO videoExperimentId1;
	INSERT INTO VideoExperiment(videoId, experimentId) VALUES (videoId2, experimentId) RETURNING id INTO videoExperimentId2;
	INSERT INTO ExperimentLabel(experimentId, labelId) VALUES (experimentId, (SELECT id FROM Label WHERE name = 'happy'));
	INSERT INTO ExperimentLabel(experimentId, labelId) VALUES (experimentId, (SELECT id FROM Label WHERE name = 'sad'));
	
	-- The annotator makes an annotation of the first chunck (first 10 minutes) of the first video
	INSERT INTO Annotation(chunkNum, videoExperimentId, annotatorId) VALUES (0, videoExperimentId1, annotatorId) RETURNING id INTO annotationId;
	INSERT INTO AnnotationEvent(instant, annotationId, labelId) VALUES
		('12 seconds'::INTERVAL, annotationId, (SELECT id FROM Label WHERE name = 'happy')),
		('1 minute 22 seconds'::INTERVAL, annotationId, (SELECT id FROM Label WHERE name = 'sad')),
		('2 minutes 12 seconds'::INTERVAL, annotationId, (SELECT id FROM Label WHERE name = 'sad')),
		('4 minutes 55 seconds'::INTERVAL, annotationId, (SELECT id FROM Label WHERE name = 'happy')),
		('8 minutes 31 seconds'::INTERVAL, annotationId, (SELECT id FROM Label WHERE name = 'happy'));
END $$

