const sequelize = require('../config/db');

// Factories
const UserFactory = require('./user');
const PostFactory = require('./post');

// Initialize models
const User = UserFactory(sequelize);
const Post = PostFactory(sequelize);

// Associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

module.exports = {
    sequelize,
    User,
    Post,
};
