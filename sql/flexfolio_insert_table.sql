USE flexfolio;

-- Insert into app_user table
INSERT INTO app_user (user_email, user_name, user_password, date_registered)
VALUES
    ('john.doe@example.com', 'John Doe', 'password1', '2023-01-01 12:00:00'),
    ('jane.smith@example.com', 'Jane Smith', 'password2', '2023-01-02 10:30:00'),
    ('alice.jones@example.com', 'Alice Jones', 'password3', '2023-01-03 14:45:00'),
    ('bob.miller@example.com', 'Bob Miller', 'password4', '2023-01-04 08:20:00'),
    ('emma.white@example.com', 'Emma White', 'password5', '2023-01-05 16:10:00'),
    ('michael.brown@example.com', 'Michael Brown', 'password6', '2023-01-06 13:25:00'),
    ('sophia.green@example.com', 'Sophia Green', 'password7', '2023-01-07 09:40:00'),
    ('william.black@example.com', 'William Black', 'password8', '2023-01-08 11:55:00'),
    ('olivia.garcia@example.com', 'Olivia Garcia', 'password9', '2023-01-09 15:15:00'),
    ('jackson.martinez@example.com', 'Jackson Martinez', 'password10', '2023-01-10 17:30:00');

-- Insert into workout_group table
INSERT INTO workout_group (group_name, group_passcode, group_description, date_created)
VALUES
    ('FitnessClub', 123456, 'A group for general fitness enthusiasts', '2023-01-01 14:00:00'),
    ('RunningCrew', 789012, 'For those passionate about running', '2023-01-02 11:30:00'),
    ('YogaLovers', 345678, 'Relax and improve flexibility', '2023-01-03 16:45:00'),
    ('StrengthTraining', 901234, 'Building strength and muscle', '2023-01-04 09:20:00'),
    ('OutdoorAdventures', 567890, 'Explore the outdoors while staying fit', '2023-01-05 17:10:00'),
    ('CrossfitChallenge', 123789, 'High-intensity crossfit workouts', '2023-01-06 14:25:00'),
    ('DanceFit', 456123, 'Get fit through dance and movement', '2023-01-07 10:40:00'),
    ('CyclingCrew', 789456, 'For cycling enthusiasts', '2023-01-08 12:55:00'),
    ('MindfulMovement', 234567, 'Focus on mindful exercises', '2023-01-09 16:15:00'),
    ('SeniorFit', 890123, 'Tailored for seniors to stay active', '2023-01-10 18:30:00');

-- Insert into post table
INSERT INTO post (caption, date_posted, user_email, group_name)
VALUES
    ('Just finished a great workout!', '2023-01-01 15:30:00', 'john.doe@example.com', 'FitnessClub'),
    ('Made my workout goals!', '2023-02-01 13:10:00', 'john.doe@example.com', 'FitnessClub'),
    ('Found a new gym bro!', '2023-05-07 12:20:00', 'john.doe@example.com', 'FitnessClub'),
    ('Morning run in the park 🏃‍♀️', '2023-01-02 12:45:00', 'jane.smith@example.com', 'RunningCrew'),
    ('Relaxing yoga session today', '2023-01-03 18:00:00', 'alice.jones@example.com', 'YogaLovers'),
    ('New personal best in deadlifts! 💪', '2023-01-04 10:20:00', 'bob.miller@example.com', 'StrengthTraining'),
    ('Hiking with friends in the mountains', '2023-01-05 18:10:00', 'emma.white@example.com', 'OutdoorAdventures'),
    ('Completed a tough crossfit WOD', '2023-01-06 15:25:00', 'michael.brown@example.com', 'CrossfitChallenge'),
    ('DanceFit class was so much fun!', '2023-01-07 11:40:00', 'sophia.green@example.com', 'DanceFit'),
    ('Scenic bike ride through the countryside', '2023-01-08 13:55:00', 'william.black@example.com', 'CyclingCrew'),
    ('Mindful meditation and stretching', '2023-01-09 17:15:00', 'olivia.garcia@example.com', 'MindfulMovement'),
    ('SeniorFit group enjoying a morning walk', '2023-01-10 19:30:00', 'jackson.martinez@example.com', 'SeniorFit');

-- Insert into user_comment table
INSERT INTO user_comment (post_id, user_email, comment_text, date_commented)
VALUES
    (1, 'jane.smith@example.com', 'Great job, John!', '2023-01-01 16:00:00'),
    (2, 'john.doe@example.com', 'Love the scenery!', '2023-01-02 13:00:00'),
    (3, 'bob.miller@example.com', 'Yoga is amazing for relaxation', '2023-01-03 18:30:00'),
    (4, 'alice.jones@example.com', 'Impressive strength, Bob!', '2023-01-04 11:00:00'),
    (5, 'sophia.green@example.com', 'Nature is the best gym!', '2023-01-05 18:30:00'),
    (6, 'emma.white@example.com', 'Crossfit is no joke, Mike!', '2023-01-06 15:45:00'),
    (7, 'michael.brown@example.com', 'DanceFit is always a blast!', '2023-01-07 12:00:00'),
    (8, 'william.black@example.com', 'Beautiful cycling route!', '2023-01-08 14:15:00'),
    (9, 'olivia.garcia@example.com', 'Mindfulness is key to a healthy life', '2023-01-09 17:45:00'),
    (10, 'jackson.martinez@example.com', 'Seniors staying active and strong!', '2023-01-10 20:00:00');

-- Insert into workouts table
INSERT INTO workouts (exercise_name, sets, reps, weight, date_recorded, user_email)
VALUES
    ('Squats', 3, 12, 135.0, '2023-01-01 16:30:00', 'john.doe@example.com'),
    ('Squats', 5, 16, 115.0, '2023-01-01 17:30:00', 'john.doe@example.com'),
    ('Morning Run', 1, 5, NULL, '2023-01-02 13:45:00', 'jane.smith@example.com'),
    ('Sun Salutations', NULL, NULL, NULL, '2023-01-03 18:15:00', 'alice.jones@example.com'),
    ('Deadlifts', 5, 8, 225.0, '2023-01-04 11:30:00', 'bob.miller@example.com'),
    ('Mountain Hike', NULL, NULL, NULL, '2023-01-05 18:45:00', 'emma.white@example.com'),
    ('WOD: Fran', 1, 21, 95.0, '2023-01-06 16:00:00', 'michael.brown@example.com'),
    ('DanceFit Class', NULL, NULL, NULL, '2023-01-07 12:15:00', 'sophia.green@example.com'),
    ('Countryside Bike Ride', NULL, NULL, NULL, '2023-01-08 14:30:00', 'william.black@example.com'),
    ('Mindful Meditation', NULL, NULL, NULL, '2023-01-09 18:00:00', 'olivia.garcia@example.com'),
    ('Morning Walk', NULL, NULL, NULL, '2023-01-10 20:15:00', 'jackson.martinez@example.com');

-- Insert into user_group table
INSERT INTO user_group (user_email, group_name)
VALUES
    ('john.doe@example.com', 'FitnessClub'),
    ('jane.smith@example.com', 'RunningCrew'),
    ('alice.jones@example.com', 'YogaLovers'),
    ('bob.miller@example.com', 'StrengthTraining'),
    ('emma.white@example.com', 'OutdoorAdventures'),
    ('michael.brown@example.com', 'CrossfitChallenge'),
    ('sophia.green@example.com', 'DanceFit'),
    ('william.black@example.com', 'CyclingCrew'),
    ('olivia.garcia@example.com', 'MindfulMovement'),
    ('jackson.martinez@example.com', 'SeniorFit');

-- Insert into user_likes_post table
INSERT INTO user_likes_post (user_email, post_id, date_liked)
VALUES
    ('jane.smith@example.com', 1, '2023-01-01 16:15:00'),
    ('john.doe@example.com', 2, '2023-01-02 14:00:00'),
    ('bob.miller@example.com', 3, '2023-01-03 18:45:00'),
    ('alice.jones@example.com', 4, '2023-01-04 12:15:00'),
    ('sophia.green@example.com', 5, '2023-01-05 19:00:00'),
    ('michael.brown@example.com', 6, '2023-01-06 16:15:00'),
    ('sophia.green@example.com', 7, '2023-01-07 12:30:00'),
    ('william.black@example.com', 8, '2023-01-08 14:45:00'),
    ('olivia.garcia@example.com', 9, '2023-01-09 18:15:00'),
    ('jackson.martinez@example.com', 10, '2023-01-10 20:30:00');