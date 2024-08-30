import React, {useEffect} from "react"

const LOGIN_URI = 'http://localhost:8888/login'
const Auth = () =>{

    const handleLogin = () => {
        window.location.href = LOGIN_URI
    };
    return(
        <div class="flex flex-col justify-center items-center min-h-screen bg-emerald-700">
            <div>
            <button onClick ={handleLogin} className="p-2 bg-white rounded"> Login with Spotify </button>
            </div>
        </div>
    )
}

export default Auth