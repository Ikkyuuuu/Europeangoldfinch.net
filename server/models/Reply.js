// src/models/reply.js
const { DataTypes } = require('sequelize');

module.exports = function ReplyFactory(sequelize) {
    const Reply = sequelize.define('Reply', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

        // FK → posts.id
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'posts', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },

        // FK → users.username (same pattern you use on Post)
        user_username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: { model: 'users', key: 'username' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },

        // optional subject; many forums only use body for replies
        topic: { type: DataTypes.STRING(255), allowNull: true },

        // the message body
        detail: { type: DataTypes.TEXT, allowNull: false },
    }, {
        tableName: 'replies',
        freezeTableName: true,
        timestamps: true,   // adds created_at / updated_at
        underscored: true,

        // Oldest → newest within a thread by default; id breaks ties
        defaultScope: {
            order: [
                ['created_at', 'ASC'],
                ['id', 'ASC'],
            ],
        },
        scopes: {
            recent: {
                order: [
                    ['created_at', 'DESC'],
                    ['id', 'DESC'],
                ],
            },
        },

        indexes: [
            // fast listing per post in time order
            { fields: ['post_id', 'created_at', 'id'], name: 'replies_post_created_idx' },
            // who replied recently
            { fields: ['user_username', 'created_at'], name: 'replies_user_created_idx' },
        ],
    });

    return Reply;
};
