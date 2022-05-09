const db = require('../models');

exports.addLike = (req, res) => {

    const like = {
        userId: req.token.userId, // get token userId  
        like: true,
        postId: req.params.id
    }

    db.likes.create(like)
        .then(() => res.status(201).json({ message: 'Post Liked successfully!' }))
        .catch(error => res.status(400).json({ error }));

};
exports.getAllLikes = (req, res) => {
    db.likes.findAll()
        .then((likes) => res.status(201).json({ likes }))
        .catch(error => res.status(400).json({ error }));

};
exports.unlike = (req, res) => {
    db.likes.destroy({ where: { userId: req.token.userId, postId: req.params.id } })
        .then(() => res.status(201).json({ message: 'Post UnLiked successfully!' }))
        .catch(error => res.status(400).json({ error }));

};