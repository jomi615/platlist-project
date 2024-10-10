const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique:true },
    song_name: { type: String, required: true },
    album: { type: String, required: true }, // This can still hold the album name
    album_id: { type: String, required: true, unique:true }, // Add album_id field
    num_played: { type: Number, default: 1 }
});


const Songs = mongoose.model('Songs', songSchema);
module.exports = Songs;
