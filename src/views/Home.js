import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import VideoFactory from '../components/Elements/VideoFactory';
import { authService, realtimeDB } from '../myBase';
import Vimeo from '@u-wave/react-vimeo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Home = () => {
    const history = useHistory()
    const onLogOutClick = () => {
        authService.signOut();
        history.go(0)
    };

    let topTenID = "8567071"
    let strategyID = "8379385"
    let salesID = "8379383"
    let planningID = "8379382"
    let mindsetID = "8379379"
    let marketingID = "8379376"
    let legacyID = "8379374"
    let peopleID = "8379372"
    let financeID = "8379370"
    let brandingID = "8379364"

    const [currentScroll, setCurrentScroll] = useState(0)

    const [isSecondLoaded, setIsSecondLoaded] = useState(false)
    const [isThirdLoaded, setIsThirdLoaded] = useState(false)

    const [isPlayerLoaded, setIsPlayerLoaded] = useState(false)
    const [episodeTitle, setEpisodeTitle] = useState('')
    const [episodeDescription, setEpisodeDescription] = useState('')
    const [episodeLink, setEpisodeLink] = useState('https://vimeo.com/577006350')



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

    const ShowPlayer = (e) => {
        let playerPopup = document.getElementById('player-popup')
        let darkBack = document.getElementById('dark-back')


        let link = e.target.getAttribute('link')
        let description = e.target.getAttribute('description')
        let name = e.target.name

        playerPopup.style.display = 'block'
        darkBack.style.display = 'block'

        setEpisodeTitle(name)
        setEpisodeLink(link)
        setEpisodeDescription(description)
    }

    const onClosePopup = (e) => {
        e.preventDefault();
        let playerPopup = document.getElementById('player-popup')
        let darkBack = document.getElementById('dark-back')

        playerPopup.style.display = 'none'
        darkBack.style.display = 'none'

    }

    document.addEventListener('scroll', (e) => {
        setCurrentScroll(window.scrollY)

        if (currentScroll > 500) {
            setIsSecondLoaded(true)
        }

        if (currentScroll > 1400) {
            setIsThirdLoaded(true)
        }
    })

    return (

        <section id="home-container" className="container-fluid text-white" style={{ minHeight: '100vh' }}>
            <div id="hero-section" className="row">
                <nav id="home-nav" className="col-12 p-2">
                    <div className="px-5 d-flex">
                        <h2 className="playfair-bold" style={{ color: '#00eeff' }}>BizFlix</h2>
                        <div style={{ marginLeft: '5%', alignSelf: 'center' }}>
                            <span className="px-3">Top 10</span>
                            <span className="px-3">Featured</span>
                            <span className="px-3">Workshops</span>
                        </div>
                        <div className="align-self-center" style={{ position: 'absolute', right: '3%' }}>
                            <button className="transparent-button mx-1" onClick={onLogOutClick}>Log Out</button>
                            <button className="transparent-button mx-1" onClick={onUnsubscribe}>Unsubscribe</button>
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

            <div className="row px-5" style={{ marginTop: '5%', }}>


                <div id="player-popup" className="text-center scroll-hidden col-md-8 col-lg-8">
                    <div className="col-12" style={{ textAlign: 'right' }}><button className="transparent-button text-white" onClick={onClosePopup} ><FontAwesomeIcon icon={['fas', 'times-circle']} size="3x" /></button></div>
                    <div className="col-12 my-3">
                        <h2 style={{ fontWeight: 'bold' }}>{episodeTitle} </h2>
                        <span>Full Screen - Double Click The Video</span>
                    </div>
                    <Vimeo
                        video={episodeLink}
                        responsive={true}
                        width={500}
                    />
                    <div className="col-md-9 col-lg-7 d-block mx-auto mt-3">
                        <p>
                            {episodeDescription}

                        </p>
                    </div>
                </div>
                <div id="dark-back"></div>
                <VideoFactory categoryName="Strategy" categoryID={strategyID} ShowPlayer={ShowPlayer} />

                <VideoFactory categoryName="Branding" categoryID={brandingID} ShowPlayer={ShowPlayer} />
                <VideoFactory categoryName="Planning" categoryID={planningID} ShowPlayer={ShowPlayer} />
                <VideoFactory categoryName="Mindset" categoryID={mindsetID} ShowPlayer={ShowPlayer} />
                <VideoFactory categoryName="Marketing" categoryID={marketingID} ShowPlayer={ShowPlayer} />
                <VideoFactory categoryName="Legacy" categoryID={legacyID} ShowPlayer={ShowPlayer} />
                <VideoFactory categoryName="People" categoryID={peopleID} ShowPlayer={ShowPlayer} />
                <VideoFactory categoryName="Finance" categoryID={financeID} ShowPlayer={ShowPlayer} />
                <VideoFactory categoryName="Sales" categoryID={salesID} ShowPlayer={ShowPlayer} />

            </div>



        </section>

    )
}

export default Home;

