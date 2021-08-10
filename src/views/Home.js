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

    // let topTenID = "8567071"
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
    const [episodeTitle, setEpisodeTitle] = useState('')
    const [episodeDescription, setEpisodeDescription] = useState('')
    const [episodeLink, setEpisodeLink] = useState('https://vimeo.com/577006350')
    const [episodeNum, setEpisodeNum] = useState('')



    const onUnsubscribe = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to unsubscribe?')) {
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
    }

    const ShowPlayer = (e) => {
        let playerPopup = document.getElementById('player-popup')
        let darkBack = document.getElementById('dark-back')


        let link = e.target.getAttribute('link')
        let description = e.target.getAttribute('description')
        let name = e.target.name
        let epNum = e.target.getAttribute('id')
        epNum = parseInt(epNum) + 1
        toString(epNum)

        playerPopup.style.display = 'block'
        darkBack.style.display = 'block'

        setEpisodeTitle(name)
        setEpisodeLink(link)
        setEpisodeDescription(description)
        setEpisodeNum(epNum)
    }

    const onClosePopup = (e) => {
        e.preventDefault();
        let playerPopup = document.getElementById('player-popup')
        let darkBack = document.getElementById('dark-back')

        playerPopup.style.display = 'none'
        darkBack.style.display = 'none'

    }

    const onReveal = (e) => {
        e.preventDefault();
        let getAnnouncement = document.getElementById('announcementContainer').classList;
        getAnnouncement.remove('d-none')
    }

    document.addEventListener('scroll', (e) => {
        setCurrentScroll(window.scrollY)
        let getNav = document.getElementById('home-nav').classList;

        if (currentScroll > 20) {
            getNav.remove('nav-top')
            getNav.add('nav-off')
        } else {
            getNav.remove('nav-off')
            getNav.add('nav-top')
        }

    })

    const onHambergerClick = (e) => {

        e.preventDefault()
        try {
            let getMenu = document.getElementById('m-nav-opened')
            let isClosed = getMenu.classList.contains('d-none')

            if (isClosed) {
                getMenu.classList.remove('d-none')
            } else {
                getMenu.classList.add('d-none')
            }

        } catch (error) {
            console.log(error.message)
            return null;
        }
    }

    // announcement에다가 top 10, reatured workshops 등의 tab을 만들수있을듯
    // 그담에 메뉴에서 눌렀을때는 이동하면서 보여주기 -> 좀귀찮

    return (

        <section id="home-container" className="container-fluid text-white" style={{ minHeight: '100vh' }}>
            <div id="hero-section" className="row">
                <nav id="mobile-nav" className="position-fixed d-md-none p-4">
                    <div className="col-12" style={{ textAlign: 'right' }}><button className="transparent-button text-white" onClick={onHambergerClick} ><FontAwesomeIcon icon={['fas', 'bars']} size="2x" /></button></div>
                    <div id="m-nav-opened" className="d-none">
                        <div className="d-grid">
                            <button className="transparent-button my-3" style={{ color: 'grey' }}>Top 10</button>
                            <button className="transparent-button my-3" style={{ color: 'grey' }}>Featured</button>
                            <button className="transparent-button my-3" style={{ color: 'grey' }}>Workshops</button>
                            <button className="transparent-button my-3" onClick={onLogOutClick} >Log Out</button>
                            <button className="transparent-button my-3" onClick={onUnsubscribe} >Unsubscribe</button>
                        </div>
                    </div>
                </nav>


                <nav id="home-nav" className="col-12 p-2 nav-top  d-md-block d-sm-none">
                    <div className="px-5 d-flex">
                        <h2 className="playfair-bold" style={{ color: '#00eeff' }}>BizFlix</h2>
                        <div style={{ marginLeft: '5%', alignSelf: 'center' }}>
                            <span className="px-3">Top 10</span>
                            <span className="px-3">Featured</span>
                            <span className="px-3">Workshops</span>
                        </div>
                        <div className="align-self-center" style={{ position: 'absolute', right: '3%' }}>
                            <button className="transparent-button mx-1" style={{ color: '#00eeff' }} onClick={onLogOutClick}>Log Out</button>
                            <button className="transparent-button mx-1" style={{ color: '#00eeff' }} onClick={onUnsubscribe}>Unsubscribe</button>
                        </div>
                    </div>
                </nav>
                <div id="hero" className="d-sm-block d-md-flex align-items-center" style={{ paddingTop: '10%', }}>
                    <div className="col-md-6" style={{ paddingLeft: '6%', }} >
                        <h1 style={{ fontSize: '50px', fontWeight: 'bold' }}>BUSINESS CINEMA</h1>
                        <h4 className="">
                            THE NEWEST AND MOST ACCESSIBLE INTERFACE IN BUSINESS COACHING THERE IS. NOWHERE ELSE CAN YOU GET THIS LEVEL OF KNOWLEDGE FOR YOUR BUSINESS, 24/7.
                            YOURS TO WATCH ANYTIME, ANYWHERE.
                        </h4>
                        <div className="w-25">
                            <button className="main-button" onClick={onReveal}>Reveal</button>

                        </div>
                    </div>
                    <div id="announcementContainer" className="col-md-5 overflow-scroll scroll-hidden d-none" >
                        <div className="col-12" style={{ textAlign: 'right' }}><button className="transparent-button text-white" onClick={() => { document.getElementById('announcementContainer').classList.add('d-none') }} ><FontAwesomeIcon icon={['fas', 'times-circle']} size="2x" /></button></div>

                        <h4 className="text-center" style={{ fontWeight: 'bold' }}>Announcement</h4>
                        <div className="mt-4" style={{ color: '#cfcfcf' }}>
                            <b style={{ fontSize: '19px' }}>Buy All Tools Bundle</b>
                            <p className="mt-3">
                                This bundle will teach you everything – all the answers, guides, done-for-you templates, and all-important tools have been bundled in this ultimate pack.
                            </p>
                            <button className="main-button">Buy Now</button>
                        </div>
                        <div className="mt-4" style={{ color: '#cfcfcf' }}>
                            <b style={{ fontSize: '19px' }}>Buy All Tools Bundle</b>
                            <p className="mt-3">
                                This bundle will teach you everything – all the answers, guides, done-for-you templates, and all-important tools have been bundled in this ultimate pack.
                            </p>
                            <button className="main-button">Buy Now</button>
                        </div>
                        <div className="mt-4" style={{ color: '#cfcfcf' }}>
                            <b style={{ fontSize: '19px' }}>Buy All Tools Bundle</b>
                            <p className="mt-3">
                                This bundle will teach you everything – all the answers, guides, done-for-you templates, and all-important tools have been bundled in this ultimate pack.
                            </p>
                            <button className="main-button">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row px-5" style={{ marginTop: '5%', }}>
                <div id="player-popup" className="text-center scroll-hidden col-md-8 col-lg-7 ">
                    <div className="col-12" style={{ textAlign: 'right' }}><button className="transparent-button text-white" onClick={onClosePopup} ><FontAwesomeIcon icon={['fas', 'times-circle']} size="3x" /></button></div>
                    <div className="col-12 my-3">
                        <h2 style={{ fontWeight: 'bold' }}>{episodeTitle} </h2>
                        <p>Full Screen - Double Click The Video</p>
                        <p style={{ color: '#fe9005' }}>Episode {episodeNum} </p>
                    </div>
                    <div className="col-lg-12 col-xl-9 d-block mx-auto">
                        <Vimeo
                            video={episodeLink}
                            responsive={true}
                            width={500}
                        />

                    </div>
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

