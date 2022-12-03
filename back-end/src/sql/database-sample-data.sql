-- Insert the very first administrator
INSERT INTO app_user(email, password, completed_date, first_name, middle_name, last_name, birth_date, gender, department) VALUES ('andrea@hotmail.com', '123', (SELECT NOW()), 'Andrea', 'Sánchez', 'Pérez', '1993/05/27 13:57:12.514+2'::TIMESTAMPTZ, 'FEMALE', 'ENGINEERING');

INSERT INTO app_user_language(is_main, language, app_user_id) VALUES
	(TRUE, 'SPANISH', 1),
	(FALSE, 'ENGLISH', 1),
	(FALSE, 'CHINESE', 1);

INSERT INTO app_user_user_role(user_role, app_user_id) VALUES
	('ADMINISTRATOR', 1),
	('DATA_SCIENTIST', 1);

