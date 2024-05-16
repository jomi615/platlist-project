const HomePage = () =>{
    const handleClick = () =>{
        window.location.href = '/login'; // Redirect to localhost:3000/login

    }
    return(
        <div> 
            <button onClick={handleClick}>Log In</button>
        </div>
    )
}
export default HomePage