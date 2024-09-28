const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    song_name: { type: String, required: true },
    album: { type: String, required: true },
    num_played: { type: Number, default: 1 }
});

const Songs = mongoose.model('Songs', songSchema);
module.exports = Songs;
