# OC_P7_Groupomania : Backend 

This is the back-end for Project 7 of Openclassrooms Web Developer path : Groupomania

## Back end Prerequisites

You will need to have Node and `npm` installed locally on your machine.

## Back end Installation

- Clone this repo, run `npm install` from within the backend directory. 
- You can then run the server with `npm start`.
- You can also run it with server refresh using `nodemon`. (use `npm install -g nodemon` before).
- Add DB_ID, DB_PASS, DB_NAME, and DB_CLUSTER for your Database Mysql in a .env file in root folder. (you can use and rename `.env_exemple` file)
- Add JWT_KEY, MAIL_CRYPTO_KEY for JWT salt and mail encrypt in a .env file in root folder. (you can use and rename `.env_exemple` file). You can add your own IP in ALLOWLIST field if you want to get unlimited request.
  
The server should run on `localhost` with default port `3000`. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

## Routes

<table style = "text-align:center">
    <thead>
        <tr style = "border-bottom: 2px solid">
            <th style = "text-align:center" width = 10%>TABLE</th>
            <th style = "text-align:center" width = 10%>METHOD</th>
            <th style = "text-align:center" width = 40%>URL</th>
            <th style = "text-align:center" width = 50%> ACTION </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=7><b>USERS</b></td>
        </tr>
        <tr>
            <td rowspan=2">POST</td>
            <td><code>/api/auth/signup</code></td>
            <td>Create Account</td>
        </tr>
        <tr>
            <td><code>/api/auth/login</code></td>
            <td>Log in Account</td>
        </tr>
        <tr>
            <td rowspan=2>GET</td>
            <td><code>/api/auth/profile/:id</code></td>
            <td>Get User Profile by Id</td>
        </tr>
        <tr>
            <td><code>/api/auth/profile/</code></td>
            <td>Get All Users Profiles - <b>Admin Only</b></td>
        </tr>
        <tr>
            <td>PUT</td>
            <td><code>/api/auth/profile/:id</code></td>
            <td>Edit Profile</td>
        </tr>
        <tr style = "border-bottom: 2px solid">
            <td>DELETE</td>
            <td><code>/api/auth/profile/:id</code></td>
            <td>Delete Profile</td>
        </tr>
        <tr>
            <td rowspan=7><b>POSTS</b></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/api/post/create</code></td>
            <td>Create Post</td>
        </tr>
        <tr>
            <td rowspan=2>GET</td>
            <td><code>/api/post/</code></td>
            <td>Get All Posts - add title in query for search</td>
        </tr>
        <tr>
            <td><code>/api/post/:id</code></td>
            <td>Get Post by Id</td>
        </tr>
        <tr>
            <td rowspan=2>PUT</td>
            <td><code>/api/post/:id</code></td>
            <td>Edit Post by Id</td>
        </tr>
        <tr>
            <td><code>/api/post/:id/image</code></td>
            <td>Delete Post Image</td>
        </tr>
        <tr style = "border-bottom: 2px solid">
            <td>DELETE</td>
            <td><code>/api/post/:id</code></td>
            <td>Delete Post by Id</td>
        </tr>
        <tr>
            <td rowspan=4><b>COMMENTS</b></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/api/comment/create</code></td>
            <td>Create Comment</td>
        </tr>
        <tr>
            <td>PUT</td>
            <td><code>/api/comment/:id</code></td>
            <td>Edit Comment by Id</td>
        </tr>
        <tr style = "border-bottom: 2px solid">
            <td>DELETE</td>
            <td><code>/api/comment/:id</code></td>
            <td>Delete Comment by Id - <b>Admin Only</b></td>
        </tr>
        <tr>
            <td rowspan=4><b>LIKES</b></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/api/post/:id/like</code></td>
            <td>Create Like by post Id</td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/api/post/all/likes</code></td>
            <td>Get All Likes</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td><code>/api/post/:id/dislike</code></td>
            <td>Delete Like by post Id</td>
        </tr>
    </tbody>
</table>

## Database Diagram

<p align="center">
    <img src="https://github.com/mhihmi/HilmiMehdi_7_01052022/blob/main/backend/images/Readme/Db_diagram.png" width="50%"/>
</p>