const {DataTypes} = require ('sequelize');
const db = require('../db');

const Playlist = db.define('playlist',{
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Songs: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports = Playlist
