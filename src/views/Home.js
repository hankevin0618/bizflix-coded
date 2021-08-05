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

        <section className="container-fluid text-white" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <div id="hero-section" className="row">
                <nav id="home-nav" className="col-12 p-2">
                    <div className="px-5 d-flex">
                        <h2 className="playfair-bold" style={{ color: '#00eeff' }}>BizFlix</h2>
                        <div style={{ marginLeft: '5%', alignSelf: 'center' }}>
                            <span className="px-3">Top 10</span>
                            <span className="px-3">Featured</span>
                            <span className="px-3">Workshops</span>

                        </div>
                    </div>
                </nav>
                <div id="hero">
                    <div style={{ marginTop: '10%', marginLeft: '6%', }} >
                        <h1 style={{ fontSize: '60px', fontWeight: 'bold' }}>BUSINESS CINEMA</h1>
                        <h4 className="w-50">
                            THE NEWEST AND MOST ACCESSIBLE INTERFACE IN BUSINESS COACHING THERE IS. NOWHERE ELSE CAN YOU GET THIS LEVEL OF KNOWLEDGE FOR YOUR BUSINESS, 24/7.
                            YOURS TO WATCH ANYTIME, ANYWHERE.
                        </h4>
                    </div>
                </div>
            </div>

            <div id="branding" className="row px-5" style={{ border: '1px solid white', marginTop: '5%', }}>
                <div className="" >
                    <h4 style={{ color: '#f5f5f5' }}>Branding</h4>

                </div>
            </div>

            <button style={{ marginTop: '50px' }} onClick={onLogOutClick}>Log Out</button>
            <button onClick={onUnsubscribe}>Unsubscribe</button>

        </section>

    )
}

export default Home;

