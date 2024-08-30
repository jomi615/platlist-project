const HomePage = () =>{
    const handleClick = () =>{
        window.location.href = '/login'; // Redirect to localhost:3000/login

    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-700 text-white">
            <div>Welcome to Playlist</div>
            <div>
                <button onClick={handleClick} className="mt-4 px-4 py-2 bg-white text-black rounded">Log In</button>
            </div>
        </div>
    )
}
export default HomePage