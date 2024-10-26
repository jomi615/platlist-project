import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ProfilePicContext } from './Contexts';
const Questionaire = () => {
    const [formData, setFormData] = useState({
        purpose: '',
        mood: '',
        genres: '',
        tempo: 'medium',
        playlist: '',
    });

    const { user, accessToken } = useContext(ProfilePicContext);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (accessToken) {
            axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
                console.log('Fetched playlists:', res.data);
                setPlaylists(res.data.items);  // Fix here
            })
            .catch((error) => console.error('Error fetching playlists:', error));
        } else {
            console.error('No access token found');
        }
    }, [accessToken]);

    const MAX_LENGTH = 50;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value.length <= MAX_LENGTH) {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await generatePlaylist(formData);
    };

    const generatePlaylist = async (formData) => {
        const { purpose, mood, genres, tempo, playlist } = formData;
        const genreArray = genres.split(',').map((g) => g.trim().toLowerCase());

        const moodMapping = {
            happy: 0.7,
            sad: 0.2,
            energetic: 0.9,
            relaxed: 0.4,
        };
        const valence = moodMapping[mood.toLowerCase()] || 0.5;

        let tempoRange = {};
        if (tempo === 'slow') {
            tempoRange = { min_tempo: 60, max_tempo: 90 };
        } else if (tempo === 'medium') {
            tempoRange = { min_tempo: 90, max_tempo: 120 };
        } else if (tempo === 'fast') {
            tempoRange = { min_tempo: 120 };
        }

        let seedTracks = [];
        if (playlist) {
            const tracksResponse = await axios.get(
                `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            seedTracks = tracksResponse.data.items.map((item) => item.track.id).slice(0, 5);
        }

        const params = {
            seed_tracks: seedTracks.join(','),
            seed_genres: genreArray.join(','),
            min_valence: valence - 0.2,
            max_valence: valence + 0.2,
            ...tempoRange,
            limit: 20,
        };

        const recommendations = await axios.get(
            'https://api.spotify.com/v1/recommendations',
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                params,
            }
        );

        console.log("Recommended tracks:", recommendations)
        console.log(user)
        const trackUris = recommendations.data.tracks.map((track) => track.uri);
        console.log(trackUris)

        const playlistResponse = await axios.post(
            `https://api.spotify.com/v1/users/${user.id}/playlists`,
            { name: `${mood} - ${tempo} Playlist`, public: false },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log(playlistResponse)

        await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistResponse.data.id}/tracks`,
            { uris: trackUris },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        alert('Playlist generated successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Purpose</label>
            <input
                type="text"
                name="purpose"
                placeholder="Enter purpose (e.g., Birthday)"
                value={formData.purpose}
                onChange={handleChange}
                maxLength={MAX_LENGTH}
            />
            <p>{formData.purpose.length} / {MAX_LENGTH} characters</p>

            <label>Mood</label>
            <input
                type="text"
                name="mood"
                placeholder="Enter mood (e.g., Happy)"
                value={formData.mood}
                onChange={handleChange}
                maxLength={MAX_LENGTH}
            />
            <p>{formData.mood.length} / {MAX_LENGTH} characters</p>

            <label>Tempo</label>
            <select name="tempo" onChange={handleChange} value={formData.tempo}>
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
            </select>

            <label>Genres</label>
            <input
                type="text"
                name="genres"
                placeholder="Enter genres (comma-separated)"
                value={formData.genres}
                onChange={handleChange}
                maxLength={MAX_LENGTH}
            />
            <p>{formData.genres.length} / {MAX_LENGTH} characters</p>

            <label>Select a Playlist (Optional)</label>
            <select name="playlist" onChange={handleChange} value={formData.playlist}>
                <option value="">Select a Playlist</option>
                {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                        {playlist.name}
                    </option>
                ))}
            </select>

            <button type="submit">Generate Playlist</button>
        </form>
    );
};

export default Questionaire;
