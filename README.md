# Flexfolio - Social Fitness Platform

## Description

Flexfolio is a social fitness platform that allows users to track and share their fitness journey in a fun and interactive way. Designed to foster motivation and community, users can join interest-based groups, create and share workout posts, and engage with others through likes and comments.

## Demo

![Flexfolio Demo](media/demo.gif)

## Features

- **User Authentication:** Secure login with email and password.
- **Profile Customization:** Users can upload headshots and personalize their profiles.
- **Group Interaction:** Create or join multiple groups based on interests.
- **Fitness Posting:** Share workout achievements with images and captions.
- **Community Engagement:** Like and comment on posts within groups.
- **Workout Logging:** Track workouts with details like sets, reps, and dates.

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
     cd ../client
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

For the application to run correctly, it needs certain environment variables. These variables are used for database connections, JWT (JSON Web Token) authentication, and AWS (Amazon Web Services) bucket configuration. You'll need to set these variables in a `.env` file in `api/`.

Here, I have already provided a sample `.env` file. I shouldn't, but I'll do it for the sake of this example. You should **never** commit your `.env` file to version control. It should always be added to `.gitignore` to prevent it from being pushed to the remote repository.

- **Go to `.env` file:** 
    Navigate to the `.env` file in `api/`.

- **Database Configuration:**
   Set the database connection variables. You should replace the placeholder values with your actual database configuration.

   ```plaintext
   DB_HOST='YourDatabaseHost'
   DB_USERNAME='YourDatabaseUsername'
   DB_PASSWORD='YourDatabasePassword'
   DB_DATABASE='YourDatabaseName'
   ```

   For example:
   ```plaintext
   DB_HOST='localhost'
   DB_USERNAME='root'
   DB_PASSWORD='yourpassword'
   DB_DATABASE='flexfolio'
   ```

- **JWT Secret Key:**
   Set a secret key for JWT. This can be any long, random string.

   ```plaintext
   JWT_SECRET='YourRandomLongString'
   ```

- **AWS Bucket Configuration:**
   Set the AWS bucket details. Replace the placeholders with your AWS S3 bucket information.

   ```plaintext
   AWS_BUCKET_NAME='YourAwsBucketName'
   AWS_BUCKET_REGION='YourAwsBucketRegion'
   AWS_ACCESS_KEY='YourAwsAccessKey'
   AWS_SECRET_KEY='YourAwsSecretKey'
   ```

   Ensure that you keep these keys confidential to prevent unauthorized access.

- **Save the `.env` file:** 
   After entering all the necessary details, save the `.env` file.



6. **Running the Application:**

   - Start the backend server:
     ```
     cd api
     npm run devStart
     ```
   - In a new terminal, start the frontend application:
     ```
     cd ../client
     npm run dev
     ```

7. **Accessing the Application:**

   - The frontend should be accessible at `http://localhost:5173`.
   - The backend API will typically run on `http://localhost:3000`.

## Libraries and Frameworks Used
- **Frontend:** React.js, Redux Toolkit, React Router
- **Backend:** Node.js, Express, Sequelize, MySQL2
- **Security:** bcrypt, JSON Web Token
- **Cloud Storage:** AWS S3
- **Styling:** Tailwind CSS

## License

Flexfolio is released under the [MIT License](LICENSE).

