DO $$
DECLARE
	user_id app_user.id%TYPE;
	admin_id administrator.id%TYPE;
	secondary_language_id secondary_language.id%TYPE;
	annotator_id data_scientist.id%TYPE;
	data_scientist_id data_scientist.id%TYPE;
	video_id_1 video.id%TYPE;
	video_id_2 video.id%TYPE;
	experiment_id experiment.id%TYPE;
	video_experiment_id_1 video_experiment.id%TYPE;
	video_experiment_id_2 video_experiment.id%TYPE;
	annotation_id annotation.id%TYPE;
BEGIN
	-- Create the initial administrator
	INSERT INTO app_user(email, password) VALUES ('sandra@gmail.com', '1234') RETURNING id INTO user_id;
	INSERT INTO administrator(parent_id) VALUES (user_id) RETURNING id INTO admin_id;
	INSERT INTO secondary_language(language, level) VALUES ('ENGLISH', 'C2') RETURNING id INTO secondary_language_id;
	INSERT INTO user_info(name, middle_name, last_name, main_language, gender, department, secondary_language_id, app_user_id)
		VALUES ('Sandra', 'Giménez', 'Pérez', 'SPANISH', 'FEMALE', 'SALES', secondary_language_id, user_id);
	
	-- Create an annotator
	INSERT INTO app_user(email, password, created_by) VALUES ('andrea@hotmail.com', '123', admin_id) RETURNING id INTO user_id;
	INSERT INTO annotator(parent_id) VALUES (user_id) RETURNING id INTO annotator_id;
	INSERT INTO secondary_language(language, level) VALUES ('SPANISH', 'B1') RETURNING id INTO secondary_language_id;
	INSERT INTO user_info(name, middle_name, last_name, main_language, gender, department, secondary_language_id, app_user_id)
		VALUES ('Andrea', 'Sánchez', 'López', 'CHINESE', 'FEMALE', 'ENGINEERING', secondary_language_id, user_id);
	
	-- Create an Data Scientist
	INSERT INTO app_user(email, password, created_by) VALUES ('diego@yahoo.com', 'diego123', admin_id) RETURNING id INTO user_id;
	INSERT INTO data_scientist(parent_id) VALUES (user_id) RETURNING id INTO data_scientist_id;
	INSERT INTO secondary_language(language, level) VALUES ('SPANISH', 'A1') RETURNING id INTO secondary_language_id;
	INSERT INTO user_info(name, middle_name, last_name, main_language, gender, department, secondary_language_id, app_user_id)
		VALUES ('Diego', 'Murillo', 'Egea', 'INDIAN', 'MALE', 'SUPPORT', secondary_language_id, user_id);
	
	-- A Data Scientist uploads two videos
	INSERT INTO video(name, url, transcript_url, num_actors, upload_date, platform, language, data_scientist_id)
		VALUES ('Google sales meeting', 'https://amazon.com/some-url/video.mp4', 'https://amazon.com/some-url/transcript.mp4', 5, (SELECT NOW()), 'GOOGLE_MEET', 'INDIAN', data_scientist_id) RETURNING id INTO video_id_1;
	INSERT INTO video(name, url, transcript_url, num_actors, upload_date, platform, language, data_scientist_id)
		VALUES ('IBM and Sony tech meeting', 'https://amazon.com/some-url/video2.mp4', 'https://amazon.com/some-url/transcript2.mp4', 12, (SELECT NOW()), 'MICROSOFT_TEAMS', 'ENGLISH', data_scientist_id) RETURNING id INTO video_id_2;
	
	-- The administrator creates two labels
	INSERT INTO label(name, emoji_unicode, created_by) VALUES ('happy', '😀', admin_id);
	INSERT INTO label(name, emoji_unicode, created_by) VALUES ('sad', '😔', admin_id);
	
	-- The administrator creates an experiment
	INSERT INTO experiment(name, chunk_time, administrator_id) VALUES ('Some experiment name', '10 minutes'::INTERVAL, admin_id) RETURNING id INTO experiment_id;
	INSERT INTO video_experiment(video_id, experiment_id) VALUES (video_id_1, experiment_id) RETURNING id INTO video_experiment_id_1;
	INSERT INTO video_experiment(video_id, experiment_id) VALUES (video_id_2, experiment_id) RETURNING id INTO video_experiment_id_2;
	INSERT INTO experiment_label(experiment_id, label_id) VALUES (experiment_id, (SELECT id FROM label WHERE name = 'happy'));
	INSERT INTO experiment_label(experiment_id, label_id) VALUES (experiment_id, (SELECT id FROM label WHERE name = 'sad'));
	
	-- The annotator makes an annotation of the first chunck (first 10 minutes) of the first video
	INSERT INTO annotation(chunk_num, video_experiment_id, annotator_id) VALUES (0, video_experiment_id_1, annotator_id) RETURNING id INTO annotation_id;
	INSERT INTO annotation_event(instant, annotation_id, label_id) VALUES
		('12 seconds'::INTERVAL, annotation_id, (SELECT id FROM label WHERE name = 'happy')),
		('1 minute 22 seconds'::INTERVAL, annotation_id, (SELECT id FROM label WHERE name = 'sad')),
		('2 minutes 12 seconds'::INTERVAL, annotation_id, (SELECT id FROM label WHERE name = 'sad')),
		('4 minutes 55 seconds'::INTERVAL, annotation_id, (SELECT id FROM label WHERE name = 'happy')),
		('8 minutes 31 seconds'::INTERVAL, annotation_id, (SELECT id FROM label WHERE name = 'happy'));
END $$

