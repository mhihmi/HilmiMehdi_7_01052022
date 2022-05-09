"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // this.belongsTo(models.users, {
            //     foreignKey: { name: 'userId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true
            // });
            // this.hasMany(models.comments, {
            //     foreignKey: { name: 'postId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true
            // });
            // this.hasMany(models.likes, {
            //     foreignKey: { name: 'postId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true
            // });
        }
    };

    Post.init({
        title: {
            type: DataTypes.STRING,
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