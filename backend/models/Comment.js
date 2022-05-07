"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            //     models.Comment.belongsTo(models.User, {
            //         foreignKey: { name: 'userId', allowNull: false },
            //         onDelete: 'CASCADE',
            //         hooks: true
            //     });
            //     models.Comment.belongsTo(models.Post, {
            //         foreignKey: { name: 'postId', allowNull: false },
            //         onDelete: 'CASCADE',
            //         hooks: true
            //     });
        }
    };

    Comment.init({
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Comment',
    });

    return Comment;
}