drop database if exists Flexfolio;
create database FlexFolio;
use FlexFolio;

drop table if exists app_user;
create table app_user (
	user_id int primary key, 
    user_name varchar(64) not null,
    email varchar(64) unique not null, 
    user_password varchar(64) not null,
    date_registered datetime 
);

drop table if exists workout_group;
create table workout_group (
	group_id int primary key, 
    group_name varchar(64), 
    group_photo blob, -- not sure how to do this yet 
    group_description text, 
    date_created datetime, 
    group_passcode int unique
);

drop table if exists post;
create table post (
	caption tinytext, 
    date_posted datetime, 
    images blob, -- not sure yet 
    
    -- create table for ternary relationships (p537 in connolly and begg)
    -- added primary key of app_user and workout_group to satisfy ternary relationship
    user_id_fk int, 
    group_id_fk int,
    primary key (user_id_fk, date_posted, group_id_fk),
    
    foreign key (user_id_fk) references app_user (user_id)
		on update cascade on delete cascade,
	foreign key (group_id_fk) references workout_group (group_id)
		on update cascade on delete cascade
);

drop table if exists user_comment;
create table user_comment (
	comment_text tinytext,
    date_commented datetime,
    
    --  -- create table for ternary relationships (p537 in connolly and begg)
    user_id_fk int, 
    primary key (user_id_fk, date_commented),
    foreign key (user_id_fk) references app_user (user_id)
		on update cascade on delete cascade
);

drop table if exists user_like;
create table user_like (
	date_liked datetime,
    
     -- create table for ternary relationships (p537 in connolly and begg)
     user_id_fk int,
     primary key (user_id_fk, date_liked),
     foreign key (user_id_fk) references app_user (user_id)
		on update cascade on delete cascade
); 

drop table if exists headshot;
create table headshot (
	url varchar(128), -- is a picture not sure how to deal with this yet 
    date_headshot_uploaded datetime,
    user_id int,
    user_id_fk int,
    foreign key (user_id_fk) references app_user (user_id)
		on update cascade on delete cascade
);

drop table if exists workouts;
create table Workouts (
	workout_id int primary key, 
    excercise_name varchar(64), 
    sets int, 
    reps int, 
    date_recorded datetime,
    user_id_fk int,
    foreign key (user_id_fk) references app_user (user_id)
		on update cascade on delete cascade
);

-- there should be 4 extra tables for ternary relationships: writes, gives, creates
-- and one more for the many to many relationship between user and group 

drop table if exists user_gives; 
create table user_gives (
-- declare partial primary keys
	user_id_ppk int,
    date_posted_ppk datetime,
    date_liked_ppk datetime,
    group_id_ppk int,
    primary key (user_id_ppk, date_posted_ppk, date_liked_ppk, group_id_ppk),
-- link foreign keys 
    foreign key (user_id_ppk, date_posted_ppk, group_id_ppk) references post (user_id_fk, date_posted, group_id_fk)
		on update cascade on delete cascade,
	foreign key (user_id_ppk, date_liked_ppk) references user_like (user_id_fk, date_liked)
		on update cascade on delete cascade
);

drop table if exists user_writes;
create table user_writes (
	user_id_ppk2 int, 
    date_posted_ppk2 datetime,
    date_commented_ppk datetime,
    group_id_ppk2 int,
    primary key (user_id_ppk2, date_posted_ppk2, date_commented_ppk, group_id_ppk2),
    foreign key (user_id_ppk2, date_posted_ppk2, group_id_ppk2) references post (user_id_fk, date_posted, group_id_fk)
		on update cascade on delete cascade,
	foreign key (user_id_ppk2, date_commented_ppk) references user_comment (user_id_fk, date_commented)
		on update cascade on delete cascade
);

drop table if exists user_creates;
create table user_creates (
	user_id_ppk3 int, 
    group_id_ppk3 int, 
    date_posted_ppk datetime,
    primary key (user_id_ppk3, date_posted_ppk, group_id_ppk3),
    foreign key (user_id_ppk3, date_posted_ppk, group_id_ppk3) references post (user_id_fk, date_posted, group_id_fk)
		on update cascade on delete cascade
);

drop table if exists user_group;
create table user_group (
	user_id_many int, 
    group_id_many int,
    primary key (user_id_many, group_id_many),
    foreign key (user_id_many) references app_user (user_id)
		on update cascade on delete cascade,
	foreign key (group_id_many) references workout_group (group_id)
		on update cascade on delete cascade 
);
        
        