import {useState} from 'react'
const HomePage = () =>{
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'||null))

    const handleClick = () =>{
        window.location.href = '/login'; // Redirect to localhost:3000/login
    }
    if(!accessToken){
        return(
            <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-700 text-white">
                <div>Welcome to Playlist</div>
                <div>
                    <button onClick={handleClick} className="mt-4 px-4 py-2 bg-white text-black rounded">Log In</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="flex flex-col items-center min-h-screen bg-emerald-700 text-white">
                <div>Welcome to Playlist</div>
            </div>
        )
    }
}
export default HomePage