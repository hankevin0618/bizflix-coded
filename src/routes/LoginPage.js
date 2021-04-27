import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

    const container = {
        background: 'white',
        padding: '100px',
        width: '75vw',
        display: 'block',
        margin: '10vh auto',
        marginBottom: '0',
        borderRadius: '4px',
        minHeight: '70vh',
    }

    return (
        <div style={{ backgroundColor: 'grey', height: '100vh' }}>
            <div style={{ paddingTop: '30px', paddingLeft: '60px' }}>
                <Link to="/" style={{ color: 'white' }}>Back</Link>
            </div>
            <div style={container}>
                asdasd
            </div>
        </div >
    )
}

export default LoginPage