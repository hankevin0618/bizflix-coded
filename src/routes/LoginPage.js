import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from '../images/loginBG.jpg'
import { GreenButton } from '../components/Elements/Buttons'
import { PlaceHolderImg } from '../components/Elements/Others'
const LoginPage = () => {

    const container = {
        backgroundImage: `url(${backgroundImg})`,
        height: '100vh'
    }

    const contentBox = {
        background: 'white',
        width: '1000px',
        display: 'flex',
        margin: '10vh auto',
        marginBottom: '0',
        borderRadius: '4px',
        minHeight: '700px',
    }

    return (
        <div id='container' style={container}>
            <div id='innerContainer' style={{ backgroundColor: '#0000004d', height: '100vh' }}>
                <div style={{ paddingTop: '30px', paddingLeft: '60px' }}>
                    <Link to="/" style={{ color: 'white' }}>Back</Link>
                </div>

                {/* Content Box */}
                <div style={contentBox}>
                    <div style={{ backgroundColor: '#2286E2', width: '65%' }}>
                        <h1 style={{
                            color: 'white',
                            textAlign: 'center',
                            paddingTop: '50px',
                            fontFamily: 'Anton'
                        }}>Welcome Back To <br /> TWOHANDS</h1>
                        <PlaceHolderImg />
                        <p style={{
                            marginTop: '30px',
                            textAlign: 'center',
                            color: 'white',
                            fontSize: '21px',
                            fontWeight: 'bold',
                        }}>Don't have an account?</p>
                        <GreenButton />

                    </div>
                    <div style={{ width: '35%' }}>right</div>

                </div>

            </div>
        </div >
    )
}

export default LoginPage