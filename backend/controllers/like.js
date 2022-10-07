const db = require('../models');

exports.addLike = (req, res) => {
    db.likes.findOne({
        where: { postId: req.params.id, userId: req.token.userId }
    }).then((like) => {
        if (like == null) {
            const newLike = {
                userId: req.token.userId, // get token userId  
                like: true,
                postId: req.params.id
            }

            db.likes.create(newLike)
                .then(() => res.status(201).json({ message: 'Post Liked successfully!' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            res.status(401).json({ Message: 'Unauthorized Request !' });
        }
    }).catch(error => res.status(400).json({ error }));
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