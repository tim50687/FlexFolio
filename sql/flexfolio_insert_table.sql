USE flexfolio;

-- Insert into user_comment table
INSERT INTO user_comment (post_id, user_email, comment_text, date_commented)
VALUES
    (1, 'jane.smith@example.com', 'Great job, John!', '2023-01-01 16:00:00'),
    (2, 'john.doe@example.com', 'Love the scenery!', '2023-01-02 13:00:00');

-- Delete specific tuples from user_comment table
DELETE FROM user_comment WHERE post_id = 1 AND user_email = 'jane.smith@example.com';
DELETE FROM user_comment WHERE post_id = 2 AND user_email = 'john.doe@example.com';

-- Insert into user_likes_post table
INSERT INTO user_likes_post (user_email, post_id, date_liked)
VALUES
    ('jane.smith@example.com', 1, '2023-01-01 16:15:00'),
    ('john.doe@example.com', 2, '2023-01-02 14:00:00');

    
-- Delete specific tuples from user_likes_post table
DELETE FROM user_likes_post WHERE user_email = 'jane.smith@example.com' AND post_id = 1;
DELETE FROM user_likes_post WHERE user_email = 'john.doe@example.com' AND post_id = 2;

