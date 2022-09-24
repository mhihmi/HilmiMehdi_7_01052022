const db = require('../models');

exports.createComment = (req, res) => {
    console.log(req.body)
    if (!req.body.content) {
        res.status(400).json({ error: 'Content can not be empty !' });
        return;
    }

    const comment = {
        userId: req.token.userId, // get token userId  
        content: req.body.content,
        postId: req.body.postId
    }

    db.comments.create(comment)
        .then((comment) => res.status(201).json({ message: 'Comment saved successfully!' }))
        .catch(error => res.status(400).json({ error }));

};
exports.updateComment = (req, res) => {

    db.comments.findOne({ where: { id: req.params.id } })
        .then(comment => {
            if (!req.body.content) {
                res.status(400).json({ error: 'Content can not be empty !' });
                return;
            };
            if ((comment.userId !== req.token.userId) && (!req.token.isAdmin)) { // Compare db comment userId /w token id
                return res.status(403).json({
                    error: new Error('Unauthorized Request !')
                })
            };

            const updatedComment = {
                userId: req.token.userId, // get token userId  
                content: req.body.content
            }

            // if DB comment UserId & token userId are the same + isAdmin = true, we can update it !
            db.comments.update({ ...updatedComment, id: req.params.id }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Comment updated successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res) => {
    db.comments.findOne({ where: { id: req.params.id } })
        .then((comment) => {
            console.log(comment)
            if (!comment) { // If no comment
                return res.status(404).json({
                    error: new Error('Comment not found !')
                })
            }
            if ((comment.userId !== req.token.userId) && (!req.token.isAdmin)) { // Compare db post userId /w token id
                return res.status(403).json({
                    error: new Error('Unauthorized Request !')
                })
            };
            // if User isAdmin, he can delete it
            db.comments.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Bad Comment successfully deleted !' }))
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(500).json({ error: console.log(error) }));
};