import React, { useState } from 'react'
import VideoFactory from '../components/VideoPlayer/VideoFactory';
import Header from '../components/Header';


const Home = ({ setLoading }) => {


    let strategyID = "8379385"
    let salesID = "8379383"
    let planningID = "8379382"
    let mindsetID = "8379379"
    let marketingID = "8379376"
    let peopleID = "8379372"
    let financeID = "8379370"




    return (

        <section id="home-container" className="container-fluid text-white" style={{ minHeight: '100vh' }}>
            <div id="hero-section" className="row">
                <div id="hero" className="d-sm-block d-md-flex align-items-center" style={{ paddingTop: '10%', }}>
                    <div className="col-md-6" style={{ paddingLeft: '6%', }} >
                        <h1 style={{ fontSize: '50px', fontWeight: 'bold' }}>BUSINESS CINEMA</h1>
                        <h4 className="">
                            THE NEWEST AND MOST ACCESSIBLE INTERFACE IN BUSINESS COACHING THERE IS. NOWHERE ELSE CAN YOU GET THIS LEVEL OF KNOWLEDGE FOR YOUR BUSINESS, 24/7.
                            YOURS TO WATCH ANYTIME, ANYWHERE.
                        </h4>
                        <div className="w-25">
                            <button className="main-button">Button</button>

                        </div>
                    </div>

                </div>
            </div>



            <div className="row px-5" style={{ marginTop: '5%', }}>                
                <div className="col-sm-12">
                    <VideoFactory categoryName="Strategy" categoryID={strategyID}  />
                    <VideoFactory categoryName="Planning" categoryID={planningID}  />
                    <VideoFactory categoryName="Mindset" categoryID={mindsetID}  />
                    <VideoFactory categoryName="Marketing" categoryID={marketingID}  />
                    <VideoFactory categoryName="People" categoryID={peopleID} />
                    <VideoFactory categoryName="Finance" categoryID={financeID}  />
                    <VideoFactory categoryName="Sales" categoryID={salesID} />
                </div>        
            </div>


        </section>

    )
}

export default Home;

