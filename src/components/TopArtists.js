import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { ProfilePicContext } from './Contexts';
const TopArtists = () => {
    const {user, accessToken} = useContext(ProfilePicContext)
    const [artists, setArtists] = useState([])
    useEffect(()=>{
        if(accessToken){
            axios.get("https://api.spotify.com/v1/me/top/artists",{
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                } 
            )
            .then(res=>{
                console.log("Fetched Artists:", res.data)
                setArtists(res.data.items)
            })  
            .catch(error => {
                console.error('Error fetching top artists:', error);
            });
        }
        else {
            console.error('No access token found');
        }
    },[accessToken])

    const top_artists = artists.slice(0, 10);
    const display_top_artists = top_artists.map(item => (
        <div key={item.id} className="flex flex-row py-4">
            {item.images && item.images.length > 0 && (
                <img className="w-[75px] h-[75px]" src={item.images[0].url} alt={`${item.name} cover`} />
            )}
            <p>{item.name}</p>
        </div>
    ));
    return(
        <div>
            Top Artists:
            {display_top_artists}
        </div>
    )
}

export default TopArtists