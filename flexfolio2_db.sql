drop database if exists Flexfolio;
create database FlexFolio;
use FlexFolio;

drop table if exists app_user;
create table app_user (
	user_email varchar(64) primary key, 
    user_name varchar(64) not null,
    user_password varchar(64) not null,
    date_registered datetime 
);

drop table if exists workout_group;
create table workout_group (
    group_name varchar(64) primary key, 
    group_passcode int unique,
    group_photo blob, -- not sure how to do this yet 
    group_description text, 
    date_created datetime
);

drop table if exists post;
create table post (
	caption tinytext, 
    date_posted datetime, 
    images blob, -- not sure yet 
    
    -- added primary key of app_user and workout_group to satisfy ternary relationship
    user_email_fk varchar(64), 
    group_name_fk varchar(64),
    primary key (user_email_fk, date_posted, group_name_fk),
    
    foreign key (user_email_fk) references app_user (user_email)
		on update cascade on delete cascade,
	foreign key (group_name_fk) references workout_group (group_name)
		on update cascade on delete cascade
);

drop table if exists user_comment;
create table user_comment (
	comment_text tinytext,
    date_commented datetime,
    user_email_fk varchar(64), 
    primary key (user_email_fk, date_commented),
    foreign key (user_email_fk) references app_user (user_email)
		on update cascade on delete cascade
);

drop table if exists headshot;
create table headshot (
	url varchar(128), -- is a picture not sure how to deal with this yet 
    date_headshot_uploaded datetime,
    user_email_fk varchar(64),
    foreign key (user_email_fk) references app_user (user_email)
	on update cascade on delete cascade
);

drop table if exists workouts;
create table Workouts (
	workout_id int primary key, 
    excercise_name varchar(64), 
    sets int, 
    reps int, 
    date_recorded datetime,
    user_email_fk varchar(64),
    foreign key (user_email_fk) references app_user (user_email)
		on update cascade on delete cascade
);

-- there should be 4 extra tables for ternary relationships: writes, gives, creates
-- and one more for the many to many relationship between user and group 

drop table if exists user_writes;
create table user_writes (
	user_email_ppk varchar(64), 
    date_posted_ppk datetime,
    date_commented_ppk datetime,
    group_name_ppk varchar(64),
    primary key (user_email_ppk, date_posted_ppk, date_commented_ppk, group_name_ppk),
    foreign key (user_email_ppk, date_posted_ppk, group_name_ppk) references post (user_email_fk, date_posted, group_name_fk)
		on update cascade on delete cascade,
	foreign key (user_email_ppk, date_commented_ppk) references user_comment (user_email_fk, date_commented)
		on update cascade on delete cascade
);

drop table if exists user_creates;
create table user_creates (
	user_email_ppk2 varchar(64), 
    group_name_ppk2 varchar(64), 
    date_posted_ppk2 datetime,
    primary key (user_email_ppk2, date_posted_ppk2, group_name_ppk2),
    foreign key (user_email_ppk2, date_posted_ppk2, group_name_ppk2) references post (user_email_fk, date_posted, group_name_fk)
		on update cascade on delete cascade
);

drop table if exists user_group;
create table user_group (
	user_email_many varchar(64), 
    group_name_many varchar(64),
    primary key (user_email_many, group_name_many),
    foreign key (user_email_many) references app_user (user_email)
		on update cascade on delete cascade,
	foreign key (group_name_many) references workout_group (group_name)
		on update cascade on delete cascade 
);

-- user_likes_post is the relationship attribute 'date_liked' for likes

drop table if exists user_likes_post;
create table user_likes_post (
	date_liked datetime,
    user_email_fk varchar(64),
    group_name_fk varchar(64),
    foreign key (user_email_fk) references app_user (user_email)
		on update cascade on delete cascade,
	foreign key (group_name_fk) references workout_group (group_name)
		on update cascade on delete cascade
);

        
        
