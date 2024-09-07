import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { ProfilePicContext } from './Contexts';
const TopTracks = () => {
    const {user, accessToken} = useContext(ProfilePicContext)
    const [songs, setSongs] = useState([])
    useEffect(()=>{
        if(accessToken){
            axios.get("https://api.spotify.com/v1/me/top/tracks",{
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                } 
            )
            .then(res=>{
                console.log("Fetched Songs:", res.data)
                setSongs(res.data.items)
            })  
            .catch(error => {
                console.error('Error fetching top songs:', error);
            });
        }
        else {
            console.error('No access token found');
        }
    },[accessToken])

    const top_songs = songs.slice(0, 10);
    const display_top_songs= top_songs.map(item => (
        <div key={item.id} className="flex flex-row py-4">
            {item.album.images && item.album.images.length > 0 && (
                <img className="w-[75px] h-[75px]" src={item.album.images[0].url} alt={`${item.name} cover`} />
            )}
            <p>{item.name}</p>
        </div>
    ));
    return(
        <div>
            Top Songs:
            {display_top_songs}
        </div>
    )
}

export default TopTracks