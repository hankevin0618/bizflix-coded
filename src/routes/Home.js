import React from 'react'
import { useHistory } from "react-router-dom";
import { authService, realtimeDB } from '../myBase';

console.log(authService.currentUser)

const Home = () => {
    const history = useHistory()
    const onLogOutClick = () => {
        authService.signOut();
        history.go(0)
    };

    return (

        <div>
            <h1>Dashboard Home</h1>

            <button style={{ marginTop: '50px' }} onClick={onLogOutClick}>Log Out</button>

        </div>

    )
}

export default Home;

