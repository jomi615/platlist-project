import React, { createContext, useState } from 'react';

// Create the context
export const ProfilePicContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <ProfilePicContext.Provider value={{ user, setUser }}>
            {children}
        </ProfilePicContext.Provider>
    );
};