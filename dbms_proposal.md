### Database Description

**1. User (Strong)**
- **Attributes:** `user_id (Primary Key)`, `name`, `email`, `password`, `date_registered`, `head_shot`

**Relationships:**
- Can create a `Post`. (One to many)
- Can create a `Comment` on a post. (One to many)
- Can `Like` a post. (One to many)
- Can `Follow` another user. (One to many)
- Can create/update/edit their `Workouts`. (One to many)
- Can join a `Group`. (Many to many)
- Can have one `Headshot (Image)`. (One to One)

**2. Post (Weak)**

- **Attributes:**  `date_posted`, `user_id (Foreign Key referencing Users)`, `group_id (Foreign Key referencing Groups)`

**Relationships:**
- Belongs to a `User`. (Many to one)
- Can be seen by a group it's posted in. 
(Many to Many)
- Can have zero or many `Images`.
(many to many)
- Can be `Liked` by users.
(many to many)
- Can be commented by the users. (many to many)

**3. Text_description (Weak)**
- **Attributes:**  `content`, `date_commented`, `user_id (Foreign Key referencing Users)`, `post_id + user_id (Foreign Key referencing Posts)`

**Relationships:**
- Belongs to a `User` (caption).
- Associated with a `Post` (comment).

**4. Image (Weak)**
- **Attributes:** `url`, `date_uploaded`, `user_id (Foreign Key referencing Users, nullable if not a headshot)`, `post_id + user_id (Foreign Key referencing Posts, nullable if not associated with a post)`

**Relationships:**
- Can be a `Headshot` of a user.
- Can be associated with a `Post`.

**5. Like (Weak)**
- **Attributes:** `date_liked`, `user_id (Foreign Key referencing Users)`, `post_id + user_id (Foreign Key referencing Posts)`

**Relationships:**
- Belongs to a `User`.
- Associated with a `Post`.


**7. Workouts (Strong)**
- **Attributes:** `workout_id (Primary Key)`, `exercise_name`, `sets`, `reps`, `date_recorded`, `user_id (Foreign Key referencing Users)`

**Relationships:**
- Belongs to a `User`.

**8. Group (Strong)**
- **Attributes:** `group_id (Primary Key)`, `group_name`, `group_description`

**Relationships:**
- Has one to many `Users`.
  
---- 
Logical 

9. Group_users 
- Table to deal with many to many 

- **Attributes:** `user_id(Foreign Key referencing Users)`, `group_id(Foreign Key referencing group)`, 

10. Post_Images
- Table to deal with many to many 
- **Attributes:** `post_id(Foreign Key referencing Posts)`, `image_id + user_id (Foreign Key referencing Images)`,

11. Post_Likes
- Table to deal with many to many
- **Attributes:** `post_id(Foreign Key referencing Posts)`, `like_id + user_id (Foreign Key referencing Likes)`,

12. Post_Users
- Table to deal with many to many
- **Attributes:** `post_id(Foreign Key referencing Posts)`, `user_id(Foreign Key referencing Users)`,




