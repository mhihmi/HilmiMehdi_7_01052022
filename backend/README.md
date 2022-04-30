# OC_P7_Groupomania : Backend 

This is the back-end for Project 7 of Openclassrooms Web Developer path : Groupomania

## Back end Prerequisites

You will need to have Node and `npm` installed locally on your machine.

## Back end Installation

- Clone this repo, run `npm install` from within the backend directory. 
- You can then run the server with `npm start`.
- You can also run it with server refresh using `nodemon server`. (use `npm install -g nodemon` before).
- Add DB_ID, DB_PASS, DB_NAME, and DB_CLUSTER for your Database Mysql in a .env file in root folder. (you can use and rename `.env_exemple` file)
- Add JWT_KEY, MAIL_CRYPTO_KEY for JWT salt and mail encrypt in a .env file in root folder. (you can use and rename `.env_exemple` file)
  
The server should run on `localhost` with default port `3000`. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

### Routes
POST, to create your account <br>
`http://localhost:3000/api/auth/signup` 

POST, to login <br>
`http://localhost:3000/api/auth/login`

GET, POST : to get all posts data or create a new post<br>
`http://localhost:3000/api/post`

GET, PUT, DELETE : to get, edit or delete a specific post<br>
`http://localhost:3000/api/post/:id`

POST : to add a like/dislike on a post<br>
`http://localhost:3000/api/post/:id/like`
