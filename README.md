# Backend for Social Media Application
  This app contains the backend part i created for the social media application.

# Tech Stack
  Node.js, Express.js, MongoDB, bcryptjs, jsonwebtoken
  
# Features
  1. User Authentication and Authorization
     - Signup: Users can create their account by providing their name, email and password. Passwords are hashed by bcrypt before storing in the database.
     - Login: Users can login using their email and password. A jwt token is generated and set as a cookie upon successful login.
     - Logout: Users can logout which clears their JWT token cookie.
     - Get Current User: Fetches the currently logged in users details except the password.
   2. User profile Management
      - Get User Profile: Fetches a user's profile by their name.
      - Follow/Unfollow User: Allows users to follow or unfollow other users. Notifications are sent when a user is followed.
      - Get Suggested Users: Provides a list of users that the current user is not following.
      - Update User: Allows users to update their profile information, including changing their password.
      - Get All Users: Fetches all users in the database.
3. Post Management
      - Create, Delete, Comment and Like/Unlike Posts.
      - Getting all posts, getting all liked posts by a user, getting all created posts by a user. 
4. Database connection and middleware
      - Connects to mongodb database.
      - Middleware to protect routes by verifying jwt tokens and fetching user from the database.
      - Generates a jwt token and sets it as a cookie.

# Usage Application
```
git clone
```
   ```
cd backend
```

   ```
npm install
```

   ```
nodemon server.js
```
