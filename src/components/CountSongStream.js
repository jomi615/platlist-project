import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { ProfilePicContext } from './Contexts';

const CountSongStream = () =>{
    const [playback, setPlayback] = useState(null);
    const {user, accessToken} = useContext(ProfilePicContext)

    useEffect(()=>{
        if(accessToken){
            axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(res=>{
                console.log("Playback data: ", res.data)
                setPlayback(res.data)
            })
            .catch(error => {
                console.error('Error fetching playback:', error);
            })
        }
        else {
            console.error('No access token found');
        }
    },[accessToken])
    let songProgressPercentage = playback.progress_ms/playback.item.duration_ms
    console.log("Playback_perentage: ", songProgressPercentage)
    
}



export default CountSongStream