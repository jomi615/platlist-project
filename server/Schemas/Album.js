const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique:true},
    album_id: { type: String, required: true, unique: true }, // Ensure album_id is unique
    album_name: { type: String, required: true },
    num_played: { type: Number, default: 1 }
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
