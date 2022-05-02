"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            models.Like.belongsTo(models.User, {
                foreignKey: { name: 'userId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
            models.Like.belongsTo(models.Post, {
                foreignKey: { name: 'postId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
        }
    };

    Like.init({
        like: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        sequelize,
        modelName: 'Like',
    });

    return Like;
}