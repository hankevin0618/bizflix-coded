import axios from 'axios';
import React from 'react'
import { useHistory } from "react-router-dom";
import { authService, realtimeDB } from '../myBase';


const Home = () => {
    const history = useHistory()
    const onLogOutClick = () => {
        authService.signOut();
        history.go(0)
    };

    const onUnsubscribe = async (e) => {
        e.preventDefault();

        let customerID;

        await realtimeDB.ref('users/' + authService.currentUser.uid).on('value', (snapshot) => {
            customerID = snapshot.val().customerID;

        })
        const res = await axios.post('http://localhost:4000/unsubscribe', { customerID })
        if (res.data.ok) {
            realtimeDB.ref('users/' + authService.currentUser.uid).update({
                subscribing: false
            })
            window.location.reload();
        } else {
            console.log(res.data.error)
        }
    }

    return (

        <div>
            <h1>Dashboard Home</h1>
            <h2 className="text-center">hey</h2>
            <button style={{ marginTop: '50px' }} onClick={onLogOutClick}>Log Out</button>
            <button onClick={onUnsubscribe}>Unsubscribe</button>

        </div>

    )
}

export default Home;

