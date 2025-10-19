const { DataTypes } = require('sequelize');

module.exports = function PostFactory(sequelize) {
    const Post = sequelize.define('Post', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

        // store username as FK on posts
        user_username: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        topic: { type: DataTypes.STRING(255), allowNull: true },
        detail: { type: DataTypes.TEXT, allowNull: true },
    }, {
        tableName: 'posts',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        indexes: [
            { fields: ['user_username', 'created_at'], name: 'posts_user_username_created_idx' },
        ],
    });

    return Post;
};
