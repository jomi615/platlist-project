const express = require('express');

const { default: mongoose } = require('mongoose');
let Songs = require('../Schemas/Songs');

const songsPlayedRoute = express.Router();

songsPlayedRoute.post('/addsong', async function(req, res) {
    try {
        console.log("Request Body:", req.body)
        const { user_id, song_name, album, num_played } = req.body;

        if (!user_id || !song_name || !album || !num_played) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let findsong = await Songs.findOne({ user_id: user_id, song_name, album });

        if (findsong) {
            findsong.num_played += 1;
            await findsong.save();
            return res.status(200).json({ message: 'Song count updated successfully' });
        } else {
            const song = new Songs({
                user_id: user_id,
                song_name: song_name,
                album: album,
                num_played: num_played
            });
            await song.save();
            return res.status(200).json({ message: 'Song added successfully' });
        }
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(400).json({ message: 'Unable to add song to the database' });
    }
});

songsPlayedRoute.get('/topten', async function(req, res) {
    try {
        let topSongs = await Songs.find().sort({ num_played: -1 }).limit(10);
        res.status(200).json(topSongs);
    } catch (error) {
        console.error('Error fetching top songs:', error);
        return res.status(500).json({ message: 'Error fetching top songs' });
    }
});

module.exports = songsPlayedRoute;
