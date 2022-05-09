"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            // this.belongsTo(models.users, {
            //     foreignKey: { name: 'userId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true
            // });
            // this.belongsTo(models.posts, {
            //     foreignKey: { name: 'postId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true
            // });
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