const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    album: { type: String, required: true },
    num_played: { type: Number, default: 1 }
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
