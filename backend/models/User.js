"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // this.hasMany(models.posts, {
            //     foreignKey: { name: 'userId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true   // ==> The beforeDestroy and afterDestroy hooks will only be called on associations that have onDelete: 'CASCADE' and hooks: true.
            // });
            // this.hasMany(models.comments, {
            //     foreignKey: { name: 'userId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true
            // });
            // this.hasMany(models.likes, {
            //     foreignKey: { name: 'userId', allowNull: false },
            //     onDelete: 'CASCADE',
            //     hooks: true
            // });
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