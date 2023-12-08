DROP DATABASE IF EXISTS flexfolio;
CREATE DATABASE flexFolio;
USE FlexFolio;

-- Create a table storing the user's information
DROP TABLE IF EXISTS app_user;
CREATE TABLE app_user (
    user_email VARCHAR(64) PRIMARY KEY,
    user_name VARCHAR(64) NOT NULL,
    user_password VARCHAR(64) NOT NULL,
    user_photo_url VARCHAR(255) DEFAULT NULL,
    date_registered DATETIME
);

-- Create a table storing the information needed when managing groups
DROP TABLE IF EXISTS workout_group;
CREATE TABLE workout_group (
    group_name VARCHAR(64) PRIMARY KEY,
    group_passcode INT UNIQUE,
    group_photo_url VARCHAR(255) DEFAULT NULL,
    group_description TEXT,
    date_created DATETIME
);

-- Create a table for handling posts 
DROP TABLE IF EXISTS post;
CREATE TABLE post (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    caption TINYTEXT,
    date_posted DATETIME,
    images_url VARCHAR(255) DEFAULT NULL,
    user_email VARCHAR(64),
    group_name VARCHAR(64),
    -- Declare foreign keys referencing app_users and workout_group 
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (group_name)
        REFERENCES workout_group (group_name)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create a table for handling comments made by users
-- Each comment is associated with a user who made the comment and the post that was commented on
DROP TABLE IF EXISTS user_comment;
CREATE TABLE user_comment (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    user_email VARCHAR(64),
    comment_text TEXT,
    date_commented DATETIME,
    -- Delcare foreign keys referencing the app_user and post tables
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES post (post_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

   
-- Create a table handling information recorded for each workout created by users
DROP TABLE IF EXISTS workouts;
CREATE TABLE workouts (
    workout_id INT PRIMARY KEY AUTO_INCREMENT,
    exercise_name VARCHAR(64),
    sets INT,
    reps INT,
    weight DECIMAL(5, 2),
    date_recorded DATETIME,
    user_email VARCHAR(64),
    -- Declare foreign key referencing app_user
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create a table handling the many to many multiplicity between app_users and workout_group
DROP TABLE IF EXISTS user_group;
CREATE TABLE user_group (
    -- Create partial primary key to reference the app_user and workout_group tables
    user_email VARCHAR(64),
    group_name VARCHAR(64),
    PRIMARY KEY (user_email , group_name),
     -- Declare foreign keys referencing app_user and workout_group 
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (group_name)
        REFERENCES workout_group (group_name)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create a table handling the attributes on the Likes relationship 
DROP TABLE IF EXISTS user_likes_post;
CREATE TABLE user_likes_post (
    date_liked DATETIME,
    -- Create partial primary key to reference the app_user and post tables
    user_email VARCHAR(64),
    post_id INT,
    PRIMARY KEY (user_email , post_id),
    -- Declare foreign keys referencing the app_user and post tables
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES post (post_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);
