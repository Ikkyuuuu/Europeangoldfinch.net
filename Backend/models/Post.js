const { DataTypes } = require('sequelize');

module.exports = function PostFactory(sequelize) {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        topic: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        // DB column will be "detail"
        detail: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'posts',
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        indexes: [
            { fields: ['user_id', 'created_at'], name: 'posts_user_created_idx' },
        ],
    });

    return Post;
};
