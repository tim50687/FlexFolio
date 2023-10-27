### Database Description

**1. User (Strong)**
- **Attributes:** `user_id (Primary Key)`, `name`, `email`, `password`, `date_registered`.

- constraint:
    - `email` is unique, not null 
    - `password` is not null

**Relationships:**
- Can create a `Post`. (One to many)
- Can writes a `Comment` on a post. (One to many)
- Can `Like` a post. (One to many)
- Can plans their `Workouts`. (One to many)
- Joins a `Group`. (one to many)
- Can have one `Headshot (Image)`. (One to One)
---

**2. Post (Weak)**

- **Attributes:**  `caption`, `date_posted`, `images`.

- Constraint:
    - ppk : `date_posted`, `user_id (Foreign Key referencing Users)`, `group_id (Foreign Key referencing Groups)`


**Relationships:**
- Belongs to a `User`. (Many to one)
- Group has many post. 
(Many to Many)
- Can be `Liked` by users.
(many to many)
- Can be commented by the users. (many to many)
---

**3. comment (Weak)**
- **Attributes:**  `text`, `date_commented`.

- Constraint: 
    - ppk (`user_id` + `date_commented` + `date_posted, user_id , group_id (post ppk)` )

**Relationships:**
`User` comment on the `post` .

---

**5. Like (Weak)**
- **Attributes:** `date_liked`.

- constrint:
    - ppk (`user_id` + `date_liked` + `date_posted, user_id , group_id (post ppk)` )

**Relationships:**
`User` like the `post` .

--- 


**4.1 headshot (Weak)**
- **Attributes:** `url`, `date_uploaded`

- Constraint:
    - ppk (`user_id` + `date_uploaded`)

**Relationships:**
- User has headshot.


--- 

**7. Workouts (Strong)**
- **Attributes:** `workout_id (Primary Key)`, `exercise_name`, `sets`, `reps`, `date_recorded`.

**Relationships:**
- Belongs to a `User`.

---

**8. Group (Strong)**
- **Attributes:** `group_id (Primary Key)`, `group_name`, `group_description`, `date_created`, `group_passcode (for invitation only))`

**Relationships:**
- Has one to many `Users`
- Has zero to many `Posts`
- Has every member workout progress (many to many)



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




