import React, { useContext, useState } from 'react';
import { ProfilePicContext } from './Contexts';

const Navbar = () => {
    const { user } = useContext(ProfilePicContext);
    const [menuExpanded, setMenuExpanded] = useState(false);

    const tabs = [
        { name: "Profile", link: "/profile" },
        { name: "Home", link: "/" },
        { name: "Create Playlists" },
        { name: "Sign Out" }
    ];

    const leftTabs = tabs.slice(0, tabs.length / 2);
    const rightTabs = tabs.slice(tabs.length / 2);

    const leftHeaders = leftTabs.map(item => (
        <a key={item.name} href={item.link} className="px-10 py-2">
            {item.name}
        </a>
    ));

    const rightHeaders = rightTabs.map(item => (
        <div key={item.name} className="px-10 py-2">
            {item.name}
        </div>
    ));

    const handleExpandMenu = () => {
        setMenuExpanded(!menuExpanded);
    };

    return (
        <div className="flex justify-center py-10 w-screen bg-transparent">
            {menuExpanded && (
                <div className="absolute left-[400px] top-[65px]">
                    <div className="flex flex-row">
                        {leftHeaders}
                    </div>
                </div>
            )}
            <input
                onClick={handleExpandMenu}
                type="image"
                className="rounded-full w-[100px] h-[100px]"
                src={user && user.images && user.images.length > 1 ? user.images[1].url : ""}
                alt="User Avatar"
            />
            {menuExpanded && (
                <div className="absolute right-[340px] top-[65px]">
                    <div className="flex flex-row">
                        {rightHeaders}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
