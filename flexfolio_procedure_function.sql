use flexfolio;

-- Procedure to create a new user in the app_user table
DELIMITER //
CREATE PROCEDURE create_user (IN email_param VARCHAR(64), IN password_param VARCHAR(64), IN name_param VARCHAR(64))
BEGIN
    -- Check if the email already exists in the database
    DECLARE email_exists_var BOOL;
    SELECT EXISTS(SELECT 1 FROM app_user WHERE user_email = email_param) INTO email_exists_var;

    IF NOT email_exists_var THEN
        -- Insert the new user into the app_user table
        INSERT INTO app_user(user_email, user_password, user_name, date_registered) 
        VALUES (email_param, password_param, name_param, NOW());
    ELSE
        -- Raise an error if the email already exists
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already exists';
    END IF;
END //
DELIMITER ;

-- Procedure to create a new workout group
DELIMITER //
CREATE PROCEDURE create_group (
    IN group_name_param VARCHAR(64), 
    IN description_param TEXT, 
    IN passcode_param INT, 
    IN user_email_param VARCHAR(64),
    IN group_photo_url_param VARCHAR(255))  -- Added parameter for group photo URL
BEGIN
    -- Create a new group with the given details
    INSERT INTO workout_group(group_name, group_passcode, group_photo_url, group_description, date_created) 
    VALUES (group_name_param, passcode_param, group_photo_url_param, description_param, NOW());  -- Include group_photo_url in the INSERT statement

    -- Add the creator as a member of the group
    INSERT INTO user_group(user_email, group_name) VALUES (user_email_param, group_name_param);
END //
DELIMITER ;


-- Procedure to handle joining a workout group
DELIMITER //
CREATE PROCEDURE join_group (IN group_name_param VARCHAR(64), IN user_email_param VARCHAR(64), IN passcode_param INT)
BEGIN
    -- Retrieve the passcode for the group
    DECLARE group_passcode_var INT;
    SELECT group_passcode INTO group_passcode_var FROM workout_group WHERE group_name = group_name_param;

    -- Add user to group if passcode matches
    IF group_passcode_var = passcode_param THEN
        INSERT INTO user_group(user_email, group_name) VALUES (user_email_param, group_name_param);
    ELSE
        -- Raise an error if passcode doesn't match
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid passcode';
    END IF;
END //
DELIMITER ;


-- Procedure to create a new post
DELIMITER //
CREATE PROCEDURE create_post (IN user_id_param VARCHAR(64), IN group_name_param VARCHAR(64), IN content_param TEXT, IN image_url_param VARCHAR(255))
BEGIN
    -- Insert a new post in the post table
    INSERT INTO post(caption, date_posted, images_url, user_email, group_name) 
    VALUES (content_param, NOW(), image_url_param, user_id_param, group_name_param);
END //
DELIMITER ;

-- Procedure to delete an existing post
DELIMITER //
CREATE PROCEDURE delete_post (IN post_id_param INT, IN user_id_param VARCHAR(64))
BEGIN
    -- Delete post if the user is the author
    DELETE FROM post WHERE post_id = post_id_param AND user_email = user_id_param;
END //
DELIMITER ;


-- Procedure to like a post
DELIMITER //
CREATE PROCEDURE like_post(IN post_id_param INT, IN user_id_param VARCHAR(64))
BEGIN
    -- Insert a like for the post by the user
    INSERT INTO user_likes_post(date_liked, user_email, post_id) VALUES (NOW(), user_id_param, post_id_param);
END //
DELIMITER ;


-- Procedure to add a comment to a post
DELIMITER //
CREATE PROCEDURE comment_on_post(IN post_id_param INT, IN user_id_param VARCHAR(64), IN comment_text_param TEXT)
BEGIN
    -- Add a comment to the post by the user
    INSERT INTO user_comment(post_id, user_email, comment_text, date_commented) 
    VALUES (post_id_param, user_id_param, comment_text_param, NOW());
END //
DELIMITER ;

-- Procedure to log a workout session
DELIMITER //
CREATE PROCEDURE log_workout (IN user_id_param VARCHAR(64), IN exercise_name_param VARCHAR(64), IN sets_param INT, IN reps_param INT)
BEGIN
    -- Log a workout session for the user
    INSERT INTO workouts(exercise_name, sets, reps, date_recorded, user_email) 
    VALUES (exercise_name_param, sets_param, reps_param, NOW(), user_id_param);
END //
DELIMITER ;


-- Procedure to update a user's profile
DELIMITER //
CREATE PROCEDURE update_profile (IN user_id_param VARCHAR(64), IN new_name_param VARCHAR(64), IN new_password_param VARCHAR(64))
BEGIN
    -- Update the user's profile with new details
    UPDATE app_user SET user_name = new_name_param, user_password = new_password_param WHERE user_email = user_id_param;
END //
DELIMITER ;


