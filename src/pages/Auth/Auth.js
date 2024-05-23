import React, {useEffect} from "react"

const LOGIN_URI = 'http://localhost:8888/login'
const Auth = () =>{

    const handleLogin = () => {
        // window.location = `${END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES}&response_type=token&show_dialog=true`;
        window.location.href = LOGIN_URI
    };
    return(
        <div class="">
            <button onClick ={handleLogin}> Login with Spotify </button>
        </div>
    )
}

export default Auth