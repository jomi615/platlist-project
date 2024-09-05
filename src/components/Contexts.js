import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const ProfilePicContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);

    useEffect(() => {
        const hash = window.location.hash;
        let token = new URLSearchParams(hash.substring(1)).get('access_token');

        if (token) {
            setAccessToken(token);
            localStorage.setItem('accessToken', token);
        } else {
            token = localStorage.getItem('accessToken');
        }

        if (token && !user) {
            axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                setUser(res.data);
                console.log('User data fetched:', res.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [accessToken]);

    return (
        <ProfilePicContext.Provider value={{ user, setUser, accessToken }}>
            {children}
        </ProfilePicContext.Provider>
    );
};
