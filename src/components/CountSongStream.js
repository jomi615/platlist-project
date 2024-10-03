import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProfilePicContext } from './Contexts';

const CountSongStream = () => {
    const [playback, setPlayback] = useState(null);
    const [lastProcessedSongId, setLastProcessedSongId] = useState(null); // Track last processed song
    const { user, accessToken } = useContext(ProfilePicContext);

    // Function to fetch the currently playing song
    const fetchCurrentlyPlaying = async () => {
        if (accessToken) {
            try {
                const res = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                console.log("Playback data: ", res.data);
                setPlayback(res.data);
            } catch (error) {
                console.error('Error fetching playback:', error);
            }
        } else {
            console.error('No access token found');
        }
    };

    useEffect(() => {
        // Fetch the currently playing song initially
        fetchCurrentlyPlaying();

        // Set up an interval to poll for the currently playing song every 5 seconds
        const intervalId = setInterval(() => {
            fetchCurrentlyPlaying();
        }, 5000); // 5 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [accessToken]);

    useEffect(() => {
        if (playback && user) {
            const songId = playback.item.id; // Use song ID for tracking
            const songProgressPercentage = playback.progress_ms / playback.item.duration_ms;
            console.log("Playback_percentage: ", songProgressPercentage);
            console.log("user.id: ", user.id);
            console.log("song_name: ", playback.item.name);
            console.log("album: ", playback.item.album.name);

            // Check if the song has played at least 50% and if it hasn't been processed yet
            if (songProgressPercentage >= 0.5 && songId !== lastProcessedSongId) {
                axios.post('http://localhost:8888/api/songs/addsong', {
                    user_id: user.id,
                    song_name: playback.item.name,
                    album: playback.item.album.name,
                    num_played: 1
                })
                    .then(response => {
                        console.log("Song added to history: ", response.data);
                        setLastProcessedSongId(songId); // Mark this song as processed
                    })
                    .catch(error => {
                        console.log("Failed to add: ", error);
                    });
            }
        }
    }, [playback, user, lastProcessedSongId]);

    return (
        <div>
            {playback ? (
                <>
                    <p>Currently Playing:</p>
                    <div className="flex flex-row py-6">
                        <img className="w-[75px] h-[75px]" src={playback.item?.album?.images[0]?.url || "fallback-image-url"} alt="currently playing" />
                        {playback.item?.name || "Unknown"}
                    </div>
                </>
            ) : (
                <p>No song is currently playing.</p>
            )}
        </div>
    );
};

export default CountSongStream;
