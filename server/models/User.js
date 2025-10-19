const { DataTypes } = require('sequelize');

module.exports = function UserFactory(sequelize) {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: { len: [3, 50] },
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },

        passwordHash: { type: DataTypes.STRING, allowNull: false },
        // token_version if you added it earlier; keep if used
        // token_version: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true,
    });

    return User;
};
