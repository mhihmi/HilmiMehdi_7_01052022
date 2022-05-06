const db = require('../models');
const fs = require('fs'); // File System

exports.createPost = (req, res) => {
    if (!req.body.content || !req.body.title) {
        res.status(400).json({ error: 'Title and content can not be empty !' });
        return;
    }

    const post = {
        userId: req.token.userId, // get token userId  
        title: req.body.title,
        content: req.body.content,
        media: req.file ? req.file.filename : null
    }

    db.posts.create(post)
        .then(() => res.status(201).json({ message: 'Post saved successfully!' }))
        .catch(error => res.status(400).json({ error }));

};

exports.getAllPosts = (req, res) => {
    db.posts.findAll({
        // include: [{
        //     model: db.User
        // }]
    })
        .then(posts => res.status(201).json({ posts: posts }))
        .catch(error => res.status(400).json({ error }));

};