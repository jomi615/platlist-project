const express = require('express');
const { default: mongoose } = require('mongoose');
let Album = require('../Schemas/Album');
let Song = require('../Schemas/Songs');
const albumsPlayedRoute = express.Router();

albumsPlayedRoute.post('/addalbum', async function (req, res) {
    try {
        console.log("Request body:", req.body);
        const { user_id, album_id, album_name, num_played } = req.body;

        if (!user_id || !album_id || !album_name || !num_played) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Group songs by album_id (not album_name) to get accurate total plays
        const songPlaysByAlbum = await Song.aggregate([
            {
                $group: {
                    _id: "$album_id", // Group by album_id
                    totalPlays: { $sum: "$num_played" }, // Sum num_played for each album
                },
            },
        ]);

        for (const album of songPlaysByAlbum) {
            // Check if the album exists using album_id
            const existingAlbum = await Album.findOne({ album_id: album._id });

            if (existingAlbum) {
                // If album exists, update its num_played
                existingAlbum.num_played = album.totalPlays;
                await existingAlbum.save();
            } else {
                // If album doesn't exist, create a new one
                const newAlbum = new Album({
                    user_id: req.body.user_id,
                    album_id: album._id, // Use the correct album_id from grouping
                    album_name: req.body.album_name, // Use the album_name from the request
                    num_played: album.totalPlays,
                });
                await newAlbum.save();
            }
        }

        res.status(200).json({ message: "Albums added/updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

albumsPlayedRoute.get('/topalbums', async function (req, res) {
    try {
        let topAlbums = await Album.find().sort({ num_played: -1 }).limit(10);
        res.status(200).json(topAlbums);
    } catch (error) {
        console.error('Error fetching top albums:', error);
        return res.status(500).json({ message: 'Error fetching top albums' });
    }
});

module.exports = albumsPlayedRoute;
