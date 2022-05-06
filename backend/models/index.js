const dbConfig = require('../config/db.config');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
);

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    });

const db = {}

db.sequelize = sequelize;

db.users = require('./User.js')(sequelize, DataTypes);
db.posts = require('./Post.js')(sequelize, DataTypes);
db.comments = require('./Comment.js')(sequelize, DataTypes);
db.likes = require('./Like.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false }) // Avoid rewrite every Table, just sync it.
    .then(() => {
        console.log('re-sync done !');
    });

module.exports = db;    