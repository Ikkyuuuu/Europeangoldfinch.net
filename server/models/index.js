const sequelize = require('../config/db');
const UserFactory = require('./user');
const PostFactory = require('./post');

const User = UserFactory(sequelize);
const Post = PostFactory(sequelize);

// N:1 — Post belongs to User via username
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

module.exports = { sequelize, User, Post };
