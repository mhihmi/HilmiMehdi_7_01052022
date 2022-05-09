"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
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