const {DataTypes} = require ('sequelize');
const db = require('../db');

const Comments = db.define('comments',{
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Body: {
        type: DataTypes.STRING,
        allowNull: false
    },

})

module.exports = Comments