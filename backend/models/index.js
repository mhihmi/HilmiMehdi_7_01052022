// const dbConfig = require('../config/db.config');
require("dotenv").config();

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        pool: {
            max: 30, // Maximum number of connection in pool
            min: 0, // Minimum number of connection in pool
            acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
            idle: 60000 // The maximum time, in milliseconds, that a connection can be idle before being released.
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
db.Sequelize = Sequelize;

db.users = require('./User.js')(sequelize, DataTypes);
db.posts = require('./Post.js')(sequelize, DataTypes);
db.comments = require('./Comment.js')(sequelize, DataTypes);
db.likes = require('./Like.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false }) // Avoid rewrite every Table, just sync it.   alter to keep data and drop tables
    .then(() => {
        console.log('re-sync done !');
    });

// db associations
/* User associations */

db.users.hasMany(db.posts, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});
db.users.hasMany(db.comments, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});
db.users.hasMany(db.likes, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});

/* Posts associations */
db.posts.belongsTo(db.users, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});
db.posts.hasMany(db.comments, {
    foreignKey: { name: 'postId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});
db.posts.hasMany(db.likes, {
    foreignKey: { name: 'postId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});

/* Comments associations */
db.comments.belongsTo(db.users, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});
db.comments.belongsTo(db.posts, {
    foreignKey: { name: 'postId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});

/* Likes associations */
db.likes.belongsTo(db.users, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});
db.likes.belongsTo(db.posts, {
    foreignKey: { name: 'postId', allowNull: false },
    onDelete: 'CASCADE',
    hooks: true
});

module.exports = db;    