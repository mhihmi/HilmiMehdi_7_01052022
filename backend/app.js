const express = require('express');
// const sequelize = require('./config/db_sequelize');
// Import File System Path 
const path = require('path');
// Import Helmet for headers security
const helmet = require("helmet");
// Import express-rate-limit to protect from force brute attacks
const rateLimit = require('express-rate-limit');
// Import Logger
const morgan = require('morgan');
// Import Routes
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

// Setup rate-limit
const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 30 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

// Security plugin call
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Middleware to secure HTTP Headers
app.disable('x-powered-by'); // Disable headers 'x-powered-by'
app.use(limiter); // Middleware to protect from brute force attacks

app.use(morgan('dev'));

// Middleware for CORS security
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Origin is ALL (*)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Headers Authorization
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Methods Authorization
    next();
});

// Middleware : intercept Post request Json & put it in req Object (req, in req.body)
app.use(express.json()); // aka body-parser()

// Multer => Serv Images folder on request for : /images 
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use Routes of userRoutes for : /api/auth
app.use('/api/auth', userRoutes);
//  Use Routes of postRoutes for : /api/post
app.use('/api/post', postRoutes);
//  Use Routes of postRoutes for : /api/comment
app.use('/api/comment', commentRoutes);

module.exports = app;