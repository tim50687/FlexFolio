drop database if exists Flexfolio;
create database FlexFolio;
use FlexFolio;

drop table if exists app_user;
CREATE TABLE app_user (
    user_email VARCHAR(64) PRIMARY KEY,
    user_name VARCHAR(64) NOT NULL,
    user_password VARCHAR(64) NOT NULL,
    date_registered DATETIME
);

drop table if exists workout_group;
CREATE TABLE workout_group (
    group_name VARCHAR(64) PRIMARY KEY,
    group_passcode INT UNIQUE,
    group_photo_url VARCHAR(255),
    group_description TEXT,
    date_created DATETIME
);

drop table if exists post;
CREATE TABLE post (
    post_id INT PRIMARY KEY,
    caption TINYTEXT,
    date_posted DATETIME,
    images_url VARCHAR(255),
    user_email VARCHAR(64),
    group_name VARCHAR(64),
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (group_name)
        REFERENCES workout_group (group_name)
        ON UPDATE CASCADE ON DELETE CASCADE
);



drop table if exists user_comment;
CREATE TABLE user_comment (
    comment_id INT PRIMARY KEY,
    post_id INT,
    user_email VARCHAR(64),
    comment_text TEXT,
    date_commented DATETIME,
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES post (post_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);


drop table if exists headshot;
CREATE TABLE headshot (
    head_shot_id INT PRIMARY KEY,
    user_email VARCHAR(64),
    image_url VARCHAR(255),
    date_uploaded DATETIME,
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE
);


drop table if exists workouts;
CREATE TABLE workouts (
    workout_id INT PRIMARY KEY,
    exercise_name VARCHAR(64),
    sets INT,
    reps INT,
    date_recorded DATETIME,
    user_email VARCHAR(64),
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE
);



drop table if exists user_group;
CREATE TABLE user_group (
    user_email VARCHAR(64),
    group_name VARCHAR(64),
    PRIMARY KEY (user_email , group_name),
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (group_name)
        REFERENCES workout_group (group_name)
        ON UPDATE CASCADE ON DELETE CASCADE
);


drop table if exists user_likes_post;
CREATE TABLE user_likes_post (
    date_liked DATETIME,
    user_email VARCHAR(64),
    post_id INT,
    PRIMARY KEY (user_email , post_id),
    FOREIGN KEY (user_email)
        REFERENCES app_user (user_email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES post (post_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);