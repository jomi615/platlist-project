import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProfilePicContext } from './Contexts';

const CountSongStream = () => {
    const [playback, setPlayback] = useState(null);
    const [lastProcessedSongId, setLastProcessedSongId] = useState(null); // Track last processed song
    const { user, accessToken } = useContext(ProfilePicContext);
    let timer;
    const debounce = (func, delay) => {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
    
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
        debounce(() => fetchCurrentlyPlaying(), 2000); // Call with 2 second delay
        const intervalId = setInterval(() => {
            fetchCurrentlyPlaying();
        }, 5000); // 5 seconds
    
        return () => clearInterval(intervalId);
    }, [accessToken]);
    

    useEffect(() => {
        if (playback && user) {
            const songId = playback.item.id; // Use song ID for tracking
            const songProgressPercentage = playback.progress_ms / playback.item.duration_ms;

            // Check if the song has played at least 50% and if it hasn't been processed yet
            if (songProgressPercentage >= 0.5 && songId !== lastProcessedSongId) {
                // First, add the song to the history
                axios.post('http://localhost:8888/api/songs/addsong', {
                    user_id: user.id,
                    song_name: playback.item.name,
                    album: playback.item.album.name,
                    album_id:playback.item.album.id,
                    num_played: 1
                })
                    .then(response => {
                        console.log("Song added to history: ", response.data);
                        setLastProcessedSongId(songId); 
                        // Then, update or add the album based on the song plays
                        return axios.post('http://localhost:8888/api/albums/addalbum', {
                            user_id: user.id,
                            album_id: playback.item.album.id,
                            album_name: playback.item.album.name, // Include album_name
                            num_played: 1
                        });
                        
                    })
                    .then(albumResponse => {
                        console.log("Album updated: ", albumResponse.data.message);
                    })
                    .catch(error => {
                        console.log("Error: ", error);
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
