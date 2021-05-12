import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImg from '../images/loginBG.jpg'

import { Container, Row, Col } from 'reactstrap';
import SignInPanel from '../components/Login/SignInPanel'
import SignUpPanel from "../components/Login/SignUpPanel";




// Style -----------------------
const container = {
    backgroundImage: `url(${backgroundImg})`,
    height: '100vh',
    backgroundSize: 'cover'
}

const contentBox = {
    display: 'flex',
    borderRadius: '4px',
}




// Style -----------------------End




const LoginPage = () => {
    const [isSignInPage, setIsSignInPage] = useState(true)



    return (
        <Container fluid style={container}>
            <Row>
                <Col xs="12" style={{ paddingTop: '30px', paddingLeft: '60px' }}>
                    <Link to="/" style={{ color: 'white' }}>Back</Link>
                </Col>
            </Row>
            <Row lg="12" className="justify-content-center" style={{ marginTop: '200px' }}>
                {/* Content Box */}
                <Col xs="12" lg="12" xl="9" style={contentBox}>
                    {/* Left Panel */}
                    {
                        isSignInPage
                            ? <SignInPanel setIsSignInPage={setIsSignInPage} />
                            : <SignUpPanel setIsSignInPage={setIsSignInPage} />
                    }


                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage