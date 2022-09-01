const bcrypt = require('bcrypt');  // hash psw
const jwt = require('jsonwebtoken'); // secure data
const cryptojs = require('crypto-js'); // encrypt mail

const fs = require('fs'); // File System

const dotenv = require("dotenv");
dotenv.config();

const db = require('../models');

exports.signup = (req, res) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.MAIL_CRYPTO_KEY).toString();
    bcrypt.hash(req.body.password, 10) // hash request psw, salt hash number - method async
        .then(hash => {
            db.users.create({ // get hashed psw & save it in User Model instance for Database
                pseudo: req.body.pseudo,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: emailCryptoJs,
                password: hash
                // isAdmin: true
            })
                .then((user) => res.status(201).json({
                    message: 'User Successfully created !',
                    token: jwt.sign( // Encode token 
                        {
                            userId: user.id,
                            isAdmin: user.isAdmin
                        }, // Check userId Request & if Admin - Payload
                        process.env.JWT_KEY, // Encode secret key - Salt
                        { expiresIn: '24h' }
                    ),
                    profile: {
                        userId: user.id, // userId in DB
                        pseudo: user.pseudo,
                    }
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.MAIL_CRYPTO_KEY).toString();

    db.users.findOne({ where: { email: emailCryptoJs } }) // Find User in DB with email sent in request, after encrypt
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User Not Found !' }); // 401 => Unauthorized
            }
            bcrypt.compare(req.body.password, user.password) // compare req psw with user hashed psw in DB
                .then(valid => { // Return a Boolean
                    if (!valid) {
                        return res.status(401).json({ error: 'Wrong Password !' });
                    }
                    res.status(200).json({
                        token: jwt.sign( // Encode token 
                            {
                                userId: user.id,
                                isAdmin: user.isAdmin
                            }, // Check userId Request & if Admin - Payload
                            process.env.JWT_KEY, // Encode secret key - Salt
                            { expiresIn: '24h' }
                        ),
                        profile: {
                            userId: user.id, // userId in DB
                            pseudo: user.pseudo,
                        }
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
exports.getUserProfile = (req, res) => {
    db.users.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password', 'email'] }
    })
        .then(user => res.status(200).json({ profile: user }))
        .catch(error => res.status(404).json({ error }));
};
exports.getAllUsersProfiles = (req, res) => {
    db.users.findAll({
        attributes: { exclude: ['password', 'email'] },
        order: [['id', 'ASC']]
    })
        .then(users => res.status(200).json({ profiles: users }))
        .catch(error => res.status(404).json({ error }));
};
exports.updateProfile = (req, res) => {
    db.users.findOne({ where: { id: req.params.id } })
        .then(user => {
            if (user.id !== req.token.userId) { // Compare db user id /w token id
                return res.status(403).json({
                    error: new Error('Unauthorized Request !')
                })
            };

            const filename = user.photo;
            if (req.file && (user.photo !== "defaultUserPhoto.png")) {
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                }); // Delete Old photo if file in req & file !== default User Photo
            };

            // const parsedUser = JSON.parse(req.body.user);

            let userObject = {
                id: req.token.userId,
                pseudo: req.body.pseudo,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            }

            if (req.file) {
                userObject.photo = `${req.file.filename}`
            }

            db.users.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
                .then(user => res.status(200).json({ userObject }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error: console.log(error) }));
};
exports.deleteProfile = (req, res) => {
    db.users.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (!user) { // If no user
                return res.status(404).json({
                    error: new Error('User not found !')
                })
            }
            if (user.id !== req.token.userId) { // Compare db user id /w token id
                return res.status(403).json({
                    error: new Error('Unauthorized Request !')
                })
            }
            // if DB UserId & token userId are the same, we can delete it
            const filename = user.photo.split('/images/')[1]; // Extract filename after images in path
            fs.unlink(`images/${filename}`, () => {
                db.users.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'User Profile deleted !' }))
                    .catch(error => res.status(404).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};