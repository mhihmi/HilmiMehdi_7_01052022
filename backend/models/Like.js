"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate() {
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