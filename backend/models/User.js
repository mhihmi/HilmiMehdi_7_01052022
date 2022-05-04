"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            models.User.hasMany(models.Post, {
                foreignKey: { name: 'userId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
            models.User.hasMany(models.Comment, {
                foreignKey: { name: 'userId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
            models.User.hasMany(models.Like, {
                foreignKey: { name: 'userId', allowNull: false },
                onDelete: 'CASCADE',
                hooks: true
            });
        }
    };

    User.init({
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            defaultValue: 'defaultUserPhoto.png'
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
}