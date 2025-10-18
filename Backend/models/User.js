const { DataTypes } = require('sequelize');

module.exports = function UserFactory(sequelize) {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true,
    });

    return User;
};
