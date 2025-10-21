// src/models/index.js
const sequelize = require('../config/db');
const UserFactory = require('./user');
const PostFactory = require('./post');
const ReplyFactory = require('./reply');

const User = UserFactory(sequelize);
const Post = PostFactory(sequelize);
const Reply = ReplyFactory(sequelize);

/* ---------------------------
   Associations
---------------------------- */

// Users ↔ Posts (via username)
User.hasMany(Post, {
    foreignKey: 'user_username',   // column in posts
    sourceKey: 'username',         // column in users
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Post.belongsTo(User, {
    foreignKey: 'user_username',
    targetKey: 'username',
    as: 'user',
});

// Posts ↔ Replies
Post.hasMany(Reply, {
    foreignKey: 'post_id',
    as: 'replies',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Reply.belongsTo(Post, {
    foreignKey: 'post_id',
    as: 'post',
});

// Users ↔ Replies (via username)
User.hasMany(Reply, {
    foreignKey: 'user_username',
    sourceKey: 'username',
    as: 'replies',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Reply.belongsTo(User, {
    foreignKey: 'user_username',
    targetKey: 'username',
    as: 'user',
});

module.exports = { sequelize, User, Post, Reply };
