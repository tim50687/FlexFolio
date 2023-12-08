# Flexfolio - Social Fitness Platform

# Description

Flexfolio is designed to be a platform and portfolio for having fun working out and exercising with friends while tracking a personalized fitness journey. The platform will foster fun and motivation around sharing fitness progress. The database will store information on each user and the workouts they create. Users are required to login with a unique email and password and are then assigned a unique ID number and registration date. To enhance their profile, users may upload a headshot, recorded with a unique URL and upload date. 

Each user is then given the option to create and/or join any number of interest-based groups focused on roommates, family, or workout buddies. Each group is given a unique ID, group photo and is defined by name, description, date created and is also given a unique group passcode used to invite users to join, facilitating community-building around shared interests. After each user joins a group, they can make many posts about fitness achievements with images and captions. Each post is open to many likes and comments from other users, fostering interaction and motivation. Each comment is associated with the user who authored it and is related to the post. Each like given to a post is attributed to the user who admired the post and the post itself. Users can only make posts within their joined groups, making them visible to all members of those groups. To promote camaraderie and healthy competition, the platform allows users to log their workouts with detailed exercise information, including sets, repetitions, and the workout's date.

## Prerequisites
To run this project, you will need to have the following installed:

- **Node.js:** This project is built using Node.js. You can download it from the [Node.js website](https://nodejs.org/).
- **MySQL Database:** The backend of this project uses MySQL. Install MySQL from the [MySQL Downloads page](https://dev.mysql.com/downloads/). 
- **MySQL Workbench:** For database management and visualization, MySQL Workbench is recommended. You can download it from the [MySQL Workbench page](https://www.mysql.com/products/workbench/).

## Installation and Setup

1. **Clone the Repository:**
   ```
   git clone https://github.com/tim50687/FlexFolio.git
   cd FlexFolio
   ```

2. **Backend Setup:**

   - Navigate to the backend directory:
     ```
     cd api
     ```
   - Install backend dependencies:
     ```
     npm install
     ```

3. **Frontend Setup:**

   - Navigate to the frontend directory:
     ```
     cd client
     ```
   - Install frontend dependencies:
     ```
     npm install
     ```

4. **Database Setup:**

- Ensure that your MySQL database service is running.
- Launch MySQL Workbench and connect to your MySQL instance.
- Open the SQL dump file provided in the project repository located at `sql/DumpFlexFolio.sql`.
- Execute the entire `sql/DumpFlexFolio.sql` script in MySQL Workbench to set up the database for the application. 


5. **Environment Variables:**

   - Set up your `.env` file in the backend directory with the necessary environment variables, such as database connection details, API keys, etc.

6. **Running the Application:**

   - Start the backend server:
     ```
     npm run devStart
     ```
   - In a new terminal, start the frontend application:
     ```
     npm run dev
     ```

7. **Accessing the Application:**

   - The frontend should be accessible at `http://localhost:5173`.
   - The backend API will typically run on `http://localhost:3000`.

## Libraries and Frameworks Used
List all the major libraries and frameworks used in your project, including their versions. For example:
- React.js
- Express
- Sequelize
- MySQL2
- bcrypt


## License
This project uses the following license: [MIT License] 

