import React, {useEffect} from "react"
// const END_POINT = 'https://accounts.spotify.com/authorize';
// const CLIENT_ID = "b200e6a1de8a440fbb247a9fdd17c02b"
// const REDIRECT_URL = "http://localhost:3000/login"
// var SCOPES = ["user-read-playback-state", 
//               "user-read-currently-playing",
//               "playlist-read-private",
//               "user-read-recently-played",
//               "user-top-read"]

// /*http://localhost:3000/#access_token=BQB_IMS2sFk9VSjoSAGw09A1wP7d-IWOuMKz6QSNTfwBeeFQrftVTvZSipt3K5T7IOCP8_WAFLhepz8QuNbyYjCJbKGuNa5-L-jXUCavCmHhSOWCwMxXz4Ph3bHnWSnW4mX4nQH3bXFsePWstwbRIaBEpldlE37Q5VYgi1bQwf3nS-XuSDpZ03PH6ULNeiXe9oOTpSOudtsWAmOOKNv-IYra0xLwLQ&token_type=Bearer&expires_in=3600*/

// const getReturnTokenFromAuth=(hash)=>{
//     const stringAfterHash = hash.substring(1);
//     const params = stringAfterHash.split("&")
//     const splitParams = params.reduce((accumulator, currentValue)=>{
//         const [key,value] = currentValue.split("=")
//         accumulator[key] = value
//         return accumulator;
//     }, {})
//     return splitParams
// }

const LOGIN_URI = 'http://localhost:8888/login'
const Auth = () =>{
    // useEffect(()=>{
    //     if(window.location.hash){
    //         const {
    //             access_token,
    //             token_type, 
    //             expires_in
    //         } = getReturnTokenFromAuth(window.location.hash)
    //         localStorage.clear()
    //         localStorage.setItem("accessToken", access_token)
    //         localStorage.setItem("tokenType", token_type)
    //         localStorage.setItem("expiresIn", expires_in)
    //         console.log(getReturnTokenFromAuth(window.location.hash))
    //     }
    // });
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