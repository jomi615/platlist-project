import React from "react"
import { useContext, useState } from 'react';
import {ProfilePicContext} from './Contexts'
const Navbar = () =>{
    let [isClicked, setIsClicked] = useState(0)
    let tabs = [
        {name:"Profile", link:"/profile"},
        {name:"Home", link:"/"},
        {name: "Create Playlists"},
        {name: "Sign Out"}
    ]
    let middleIndex = ((tabs.length)/2)
    let leftTabs = tabs.slice(0,middleIndex)
    let rightTabs = tabs.slice(middleIndex,tabs.length) 
    const {user} = useContext(ProfilePicContext)
    console.log("User: ", user)

    const [menuExpanded, setMenuExpanded]=useState(false)
    let leftHeaders = leftTabs.map(item => (
        <div key={item.name} className="px-10 py-2">
            {item.name}
        </div>
    ));
    let rightHeaders = rightTabs.map(item => (
        <div key={item.name} className="px-10 py-2">
        {item.name}
    </div>
    ))

    const ExpandMenu = () =>{
        if(isClicked==0){
            setMenuExpanded(true)
            setIsClicked(1)
        }
        else{
            setMenuExpanded(false)
            setIsClicked(0)
        }
    }
 
    
    return(
        <div className = "relative flex justify-center py-10 w-screen">
            {/* {leftHeaders} */}
            {menuExpanded && (
                <div className="absolute left-[400px] top-[65px]">
                    <div className="flex flex-row">
                        {leftHeaders}    
                    </div>
                </div>
            )}
            <input onClick = {ExpandMenu}
             type="image" className={`rounded-full w-[100px] h-[100px]`} src={user && user.images[1].url} alt="User Avatar" />
            {/* {rightHeaders} */}
            {menuExpanded && (
                <div className="absolute right-[340px] top-[65px]">
                    <div className="flex flex-row">
                        {rightHeaders}    
                    </div>
                </div>
            )}
        </div>
        
    )
}
export default Navbar;
