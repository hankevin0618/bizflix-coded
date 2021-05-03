import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from '../images/loginBG.jpg'
import { GreenButton, BlackInput } from '../components/Elements/Buttons'
import { PlaceHolderImg } from '../components/Elements/Others'
import logoImage from "../images/logo_b.png"
import { Container, Row, Col } from 'reactstrap';
import { GoogleButton, FacebookButton, GithubButton } from '../components/Elements/SNSButtons'

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

const leftPanelStyle = {
    backgroundColor: '#2286E2',
    width: '65%'
}

const logoStyle = {
    display: 'block',
    margin: 'auto',
    marginTop: '70px',
    width: '210px'
}

const formStyle = {
    display: 'grid',
    gridGap: ' 13px'
}

// Style -----------------------End




const LoginPage = () => {

    const onSubmit = (event) => {
        event.preventDefault()
    }


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
                    <div className="pb-5" style={leftPanelStyle}>
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
                        <GreenButton value="Sign Up" />
                    </div>
                    {/* Right Panel */}
                    <div className="bg-white" style={{ width: '35%' }}>
                        <img src={logoImage} style={logoStyle} alt="Logo" />
                        <form onSubmit={onSubmit} style={formStyle} className="px-3">
                            <input required type="text" name="email" placeholder="Email" />
                            <input required type="password" name="password" placeholder="Password" />
                            <div>
                                <p className="text-center font-weight-bold" style={{ color: 'dimgray' }}>
                                    Sign In Options
                            </p>
                                <div className="d-flex p-3">
                                    <GoogleButton type="signIn" />
                                    <FacebookButton type="signIn" />
                                    <GithubButton type="signIn" />

                                </div>
                                <div className="text-center mt-4" >
                                    <BlackInput value="Sign In" />
                                </div>
                            </div>

                        </form>



                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage