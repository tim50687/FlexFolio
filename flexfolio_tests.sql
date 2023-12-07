USE flexfolio;
 
-- test functions 

-- test number of users in group 
SELECT num_group_users('FitnessClub'); 

-- test number of posts by a given user
SELECT num_user_posts('john.doe@example.com');

-- test average number of sets in a given workout   
SELECT  avg_sets_by_workout('Squats'); 

-- test adding date to comment via trigger 
INSERT INTO user_comment (comment_id, post_id, user_email, comment_text)
	VALUES (11, 1, 'john.doe@example.com', 'This is a test comment');
SELECT * FROM user_comment 
	WHERE comment_id = 11;

-- test stored procedures 

-- test user creation 
CALL create_user('test_user@example.com', 'password11', 'Will Lunge');
SELECT * FROM app_user 
	where user_email = 'test_user@example.com';

-- test group creation
CALL create_group(
	'TheSaberists', 
    'Saber fencing group', 
    987654,
    'test_user@example.com',
    NULL);
SELECT * FROM workout_group
	WHERE group_name = 'TheSaberists';

-- test user joining a group 
CALL join_group(
	'FitnessClub', 
    'test_user@example.com', 
    123456);
SELECT * FROM user_group
	where group_name = 'DanceFit'; 

-- test post creation
 CALL create_post(
	'test_user@example.com', 
    'TheSaberists', 
    'Remember: Parry, Resposte!', 
    Null); 
SELECT * from post
	where user_email = 'test_user@example.com'; 

-- test deletion of an existing post 
CALL create_post(
	'test_user@example.com', 
    'TheSaberists', 
    'Epee <3', 
    Null); 
    
SELECT * FROM post
	WHERE post_id = 12; 
    
CALL delete_post(
    12, 
    'test_user@example.com');
    
-- test ability to like a post 
CALL like_post(
	11, 
    'test_user@example.com');
    
SELECT * FROM user_likes_post
	where user_email = 'test_user@example.com';
    
-- test commenting on a post 
CALL comment_on_post(
	11, 
    'test_user@example.com',
    'Ofc he likes to parry :)');
    
SELECT * FROM user_comment
	where post_id = 11;
    
-- test workout session log 
CALL log_workout(
	'test_user@example.com', 
    'Advances and Retreats', 
    5, 
    10,
    15.0);
    
SELECT * FROM workouts
	where exercise_name = 'Advances and Retreats';
    
-- test updating a profile 
CALL update_profile(
	'test_user@example.com', 
    'Saber Stan',
    'password99');
    
SELECT * FROM app_user
	where user_email = 'test_user@example.com';
    
    
















    