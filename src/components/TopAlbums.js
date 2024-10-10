import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProfilePicContext } from './Contexts';

const TopAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const { user, accessToken } = useContext(ProfilePicContext);

    // Function to fetch album details from Spotify API
    const fetchAlbumDetails = async (albumId) => {
        try {
            const res = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            return res.data; // Return the album details
        } catch (error) {
            console.error('Error fetching album details from Spotify:', error);
        }
    };

    useEffect(() => {
        const getTopAlbums = async () => {
            try {
                const res = await axios.get('http://localhost:8888/api/albums/topalbums');
                const topAlbums = res.data;

                // For each album, fetch additional details from Spotify
                const albumDetailsPromises = topAlbums.map(async (album) => {
                    const albumDetails = await fetchAlbumDetails(album.album_id); // Fetch details from Spotify
                    return {
                        ...album, 
                        album_name: albumDetails.name, // Album name from Spotify
                        album_artwork: albumDetails.images[0]?.url, // Album artwork from Spotify
                    };
                });

                // Wait for all album details to be fetched
                const albumsWithDetails = await Promise.all(albumDetailsPromises);
                setAlbums(albumsWithDetails);
            } catch (error) {
                console.error('Error fetching top albums:', error);
            }
        };

        getTopAlbums();
    }, [accessToken]);

    return (
        <div>
            <h1>Top Albums</h1>
            <div className="album-list h-96 overflow-y-scroll">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <div key={album.album_id} className="flex flex-row py-4">
                            <img className="w-[75px] h-[75px]" src={album.album_artwork || 'fallback-image-url'} alt={album.album_name} />
                            <p>{album.album_name}</p>
                        </div>
                    ))
                ) : (
                    <p>No albums found.</p>
                )}
            </div>
        </div>
    );
};

export default TopAlbums;
