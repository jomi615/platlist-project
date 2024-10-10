const express = require('express');
const { default: mongoose } = require('mongoose');
let Songs = require('../Schemas/Songs');

const songsPlayedRoute = express.Router();

songsPlayedRoute.post('/addsong', async function(req, res) {
    try {
        console.log("Request Body:", req.body);
        const { user_id, song_name, album, album_id, num_played } = req.body; // Add album_id to destructuring

        // Ensure all required fields are provided
        if (!user_id || !song_name || !album || !album_id || !num_played) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find the song by user_id, song_name, and album_id to ensure uniqueness
        let findsong = await Songs.findOne({ user_id: user_id, song_name: song_name, album_id: album_id });

        if (findsong) {
            // If the song exists, increment the play count
            findsong.num_played += 1;
            await findsong.save();
            return res.status(200).json({ message: 'Song count updated successfully' });
        } else {
            // If the song doesn't exist, create a new one
            const newSong = new Songs({
                user_id: user_id,
                song_name: song_name,
                album: album, // Album name
                album_id: album_id, // Album ID
                num_played: num_played
            });
            await newSong.save();
            return res.status(200).json({ message: 'Song added successfully' });
        }
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(400).json({ message: 'Unable to add song to the database' });
    }
});

songsPlayedRoute.get('/topten', async function(req, res) {
    try {
        // Fetch the top ten songs, sorted by play count
        let topSongs = await Songs.find().sort({ num_played: -1 }).limit(10);
        res.status(200).json(topSongs);
    } catch (error) {
        console.error('Error fetching top songs:', error);
        return res.status(500).json({ message: 'Error fetching top songs' });
    }
});

module.exports = songsPlayedRoute;
