import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ProfilePicContext } from '../../components/Contexts';
import Navbar from '../../components/Navbar';
import TopArtists from '../../components/TopArtists'
import TopTracks from '../../components/TopTracks'
const Profile = () => {
    const { user, accessToken } = useContext(ProfilePicContext);
    const [playlists, setPlaylists] = useState([]);

    console.log("Profile.js - accessToken:", accessToken);
    console.log("Profile.js - user:", user);

    useEffect(() => {
        if (accessToken) {
            axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(res => {
                console.log('Fetched playlists:', res.data);
                setPlaylists(res.data);
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
            });
        } else {
            console.error('No access token found');
        }
    }, [accessToken]);

    const playlist_array = playlists.items || [];
    const createdByUser = playlist_array.filter(collection => collection.owner.id === user?.id);

    const playlist_list = createdByUser.map(item => (
        <div key={item.id}>
            {item.images && item.images.length > 0 && (
                <img className="w-[75px] h-[75px]" src={item.images[0].url} alt="playlist cover"/>
            )}
            <p>{item.name}</p>
        </div>
    ));

    return (    
        <div className="grid grid-cols-3">
            <div>
                <TopArtists/>
            </div>
            <div>
                <TopTracks/>
            </div>
            <div className="grid grid-cols-1 gap-4">
                Playlists:
                {playlist_list}
            </div>
        </div>
    );
};

export default Profile;
