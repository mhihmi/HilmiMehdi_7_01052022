const bcrypt = require('bcrypt');  // hash psw
const jwt = require('jsonwebtoken'); // secure data
const cryptojs = require('crypto-js'); // encrypt mail

const dotenv = require("dotenv");
dotenv.config();

const db = require('../models');

exports.signup = (req, res) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.MAIL_CRYPTO_KEY).toString();

    bcrypt.hash(req.body.password, 10) // hash request psw, salt hash number - method async
        .then(hash => {
            const user = new User({ // get hashed psw & save it in User Model instance for Database
                email: emailCryptoJs,
                password: hash,
                ...req.body
            });
            user.save() // save new user in Database
                .then(() => res.status(201).json({ message: 'User Created !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); // Error 500 => server
};