import React from 'react';
import { PlaceHolderImg } from '../Elements/Others'
import RightPanel from './RightPanel';




const panelStyle = {
    backgroundColor: '#2286E2',
    width: '65%',
    minHeight: '620px'
}

const placeholderStyle = {
    width: '70%',
    display: 'block',
    margin: 'auto',
    marginTop: '40px',
}

const SignInPanel = ({ setIsSignInPage }) => {

    const onClick = () => {
        setIsSignInPage(false)
    }

    return (
        <>
            <div className="pb-5" style={panelStyle}>
                <h1 style={{
                    color: 'white',
                    textAlign: 'center',
                    paddingTop: '50px',
                    fontFamily: 'Anton'
                }}>Welcome Back To <br /> TWOHANDS</h1>
                <PlaceHolderImg placeholderStyle={placeholderStyle} />
                <p style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '21px',
                    fontWeight: 'bold',
                }}>Don't have an account?</p>
                <button id="green-button" onClick={onClick} >Sign Up</button>
            </div>
            <RightPanel type="signIn" />
        </>
    )
}

export default SignInPanel;