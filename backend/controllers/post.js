const db = require('../models');
const fs = require('fs'); // File System
const Op = db.Sequelize.Op;

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
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    db.posts.findAll({
        order: [['createdAt', 'DESC']],
        where: condition,
        include: [{
            model: db.users, attributes: ['pseudo', 'photo']
        },
        {
            model: db.comments, include: [{
                model: db.users, attributes: ['pseudo', 'photo']
            }]
        },
        {
            model: db.likes
        }]
    })
        .then(post => res.status(201).json({ post }))
        .catch(error => res.status(400).json({ error }));
};

exports.getPost = (req, res) => {
    db.posts.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.users, attributes: { exclude: ['password', 'email'] }
        },
        {
            model: db.comments
        },
        {
            model: db.likes
        }]
    })
        .then(post => res.status(201).json({ post: post }))
        .catch(error => res.status(400).json({ error }));
};

exports.updatePost = (req, res) => {
    db.posts.findOne({
        where: { id: req.params.id }, include: [{ model: db.users }]
    })
        .then(post => {
            if ((post.userId !== req.token.userId) && (!req.token.isAdmin)) { // Compare db post userId /w token id
                return res.status(403).json({
                    error: new Error('Unauthorized Request !')
                })
            };

            console.log(req.body)

            const filename = post.media;
            if (req.file && (post.media !== null)) {
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                        console.log(err);
                    } // Delete Old media if file in req & file !== null
                })
            };

            const parsedPost = JSON.parse(req.body.post);

            let postObject = {
                id: parsedPost.id,
                content: parsedPost.content,
                title: parsedPost.title,
            }

            if (req.file) {
                postObject.media = `${req.file.filename}`
            }
            // if DB UserId & token userId are the same + isAdmin = true, we can update it !
            db.posts.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Post updated successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deletePostImg = (req, res) => {
    db.posts.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (!post) { // If no user
                return res.status(404).json({
                    error: new Error('Post not found !')
                })
            };
            if (post.media === null) { // If no user
                return res.status(404).json({
                    error: new Error('Image to delete not found !')
                })
            };
            if ((post.userId !== req.token.userId) && (!req.token.isAdmin)) { // Compare db post userId /w token id
                return res.status(403).json({
                    error: new Error('Unauthorized Request !')
                })
            };
            const filename = post.media;
            fs.unlink(`images/${filename}`, (err) => {
                if (err) {
                    console.log(err);
                } // Delete media in db
            })
            let postObject = {
                media: null
            }
            db.posts.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Image deleted successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res) => {
    db.posts.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (!post) { // If no user
                return res.status(404).json({
                    error: new Error('Post not found !')
                })
            }

            if ((post.userId !== req.token.userId) && (!req.token.isAdmin)) { // Compare db post userId /w token id
                return res.status(403).json({
                    error: new Error('Unauthorized Request !')
                })
            };
            // if DB UserId & token userId are the same + isAdmin = true, we can delete it
            const filename = post.media;
            fs.unlink(`images/${filename}`, () => {
                db.posts.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post deleted !' }))
                    .catch(error => res.status(404).json({ error }));
            })
        })
        .catch(error => res.status(400).json({ error }));
};