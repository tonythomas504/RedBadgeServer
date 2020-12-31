const User = require('./users')
const Comments = require('./comment')
const Playlist = require('./playlists')

User.hasMany(Playlist);
Playlist.belongsTo(User)

User.hasMany(Comments);
Comments.belongsTo(User)

Playlist.hasMany(Comments)
Comments.belongsTo(Playlist)

module.exports = {User,Comments, Playlist}

