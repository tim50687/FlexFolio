use flexfolio; 

-- function that calls the number of users in a given group 
delimiter //
CREATE FUNCTION num_group_users
	(
    target_group_name VARCHAR (64)
    )
    RETURNS INT
    DETERMINISTIC READS SQL DATA 
    BEGIN 
		DECLARE num_users INT;
        
        SELECT count(*) AS amt_users
			INTO num_users
            FROM user_group 
            WHERE group_name = target_group_name;
		RETURN (num_users);
	END // 
delimiter ; 

-- function that calls the number of posts made by a user 
delimiter // 
CREATE FUNCTION num_user_posts
	(
    target_user_email VARCHAR (64)
    )
    RETURNS INT
    DETERMINISTIC READS SQL DATA
    BEGIN
		DECLARE num_posts INT; 
        
        SELECT count(*) AS amt_posts 
			INTO num_posts 
            FROM post 
            WHERE user_email = target_user_email;
		RETURN (num_posts); 
	END //
delimiter ; 

-- function that calculates the number of average sets per workout 
delimiter // 
CREATE FUNCTION avg_sets_by_workout
	(
    tartget_workout VARCHAR (64)
    )
    RETURNS INT
    DETERMINISTIC READS SQL DATA 
    BEGIN 
		DECLARE avg_sets DECIMAL(10, 2);
        
        SELECT AVG(sets) AS average_sets
			INTO avg_sets 
			FROM workouts
			WHERE exercise_name = target_workout; 
        return avg_sets; 
	end //
delimiter ; 

        
		
