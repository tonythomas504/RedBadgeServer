const {DataTypes} = require('sequelize');
const db = require('../db')

const User = db.define('user', {

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

module.exports = User;