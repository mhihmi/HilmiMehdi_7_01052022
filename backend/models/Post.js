"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            models.Post.belongsTo(models.User, {
                foreignKey: { name: 'userId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
            models.Post.hasMany(models.Comment, {
                foreignKey: { name: 'postId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
            models.Post.hasMany(models.Like, {
                foreignKey: { name: 'postId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
        }
    };

    Post.init({
        title: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        media: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'Post',
    });

    return Post;
}