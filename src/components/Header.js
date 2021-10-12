import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import {authService } from '../myBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    const history = useHistory()

    const onLogOutClick = () => {
        authService.signOut();
        history.go(0)
    };

    
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

    return (
    <>
        <nav id="mobile-nav" className="position-fixed d-md-none p-4">
                    <div className="col-12" style={{ textAlign: 'right' }}><button className="transparent-button text-white" onClick={onHambergerClick} ><FontAwesomeIcon icon={['fas', 'bars']} size="2x" /></button></div>
                    <div id="m-nav-opened" className="d-none">
                        <div className="d-grid">
                            <button className="transparent-button my-3" style={{ color: 'grey' }}>Top 10</button>
                            <button className="transparent-button my-3" style={{ color: 'grey' }}>Featured</button>
                            <button className="transparent-button my-3" style={{ color: 'grey' }}>Workshops</button>
                            <button className="transparent-button my-3" onClick={onLogOutClick} >Log Out</button>
                        </div>
                    </div>
                </nav>


                <nav id="home-nav" className="col-12 p-2 nav-top d-md-block d-sm-none">
                    <div className="px-5 d-flex">
                        <Link to="/" style={{textDecoration:'none'}}><h2 className="playfair-bold" style={{ color: '#00eeff' }}>BizFlix</h2></Link>
                        <div className="text-white" style={{ marginLeft: '5%', alignSelf: 'center' }}>
                            <span className="px-3">Menu</span>
                            <span className="px-3">Menu</span>
                            <span className="px-3">Menu</span>
                        </div>
                        <div className="align-self-center" style={{ position: 'absolute', right: '3%' }}>
                            <button className="transparent-button mx-1" style={{ color: '#00eeff' }} onClick={onLogOutClick}>Log Out</button>
                            <Link to="/my-account" replace>My Account</Link>
                        </div>
                    </div>
                </nav>
                </>
    )
}

export default Header
