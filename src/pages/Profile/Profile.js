import axios from "axios"
import { useLocation } from 'react-router-dom';
import {createContext, useContext} from 'react'
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { ProfilePicContext } from "../../components/Contexts";
const Profile = () =>{
    const location = useLocation();
    // const [user, setUser] = useState([]);
    const {user, setUser} = useContext(ProfilePicContext);

    const [playlists, setPlaylists] = useState([]);
    const hash = location.hash;

    const access_token = new URLSearchParams(hash.substring(1)).get('access_token');
    console.log(access_token);

    useEffect(() => {
      if (access_token) {
          axios.get(`https://api.spotify.com/v1/me`, {
              headers: {
                  'Authorization': `Bearer ${access_token}`
              }
          })
          .then(res => {
              console.log("Fetched user data:", res.data);
              setUser(res.data);
          })
          .catch(error => {
              console.error("There was an error making the request:", error);
          });
      } else {
          console.error("No access token found in URL hash");
      }
  }, [location, access_token, setUser]);

  useEffect(() => {
      if (access_token) {
          axios.get(`https://api.spotify.com/v1/me/playlists`, {
              headers: {
                  'Authorization': `Bearer ${access_token}`
              }
          })
          .then(res => {
              console.log("Fetched playlists:", res.data);
              setPlaylists(res.data);
          })
          .catch(error => {
              console.error("Error fetching playlists:", error);
          });
      } else {
          console.error("No access token found");
      }
  }, [access_token]);
      //Created an array to store playlists made by users
      console.log("User: ", user )

      let playlist_array = playlists.items || [];
      console.log("playlist array:",playlist_array)
      const createdByUser = playlist_array.filter(collection=>
        collection.owner.id===user.id
      )

      //Using map to dynamically display playlist 
      const playlist_list = createdByUser.map(item => (
          <div>
          {item.images && item.images.length > 0 && (
            <img className ="w-[300px] h-[300px]" src={item.images[0].url} alt="playlist cover"/>
          )}
          <p>{item.name}</p>
          </div>
      ));


      let newWidth = '';
      let newHeight = '';
  
      if (user && user.images && user.images.length > 1) {
        newWidth = user.images[1].width - 100;
        newHeight = user.images[1].height - 100;
        console.log(newHeight)
        console.log(newWidth)

      }

      return (
        <div className="flex flex-col justify-center items-center">
            <div className="">
              <Navbar/>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
            {playlist_list}
            </div>
        </div>
      );
}


export default Profile