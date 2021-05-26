import React from "react"
import { Nav, NavItem } from 'reactstrap'
import logoImage from "../images/logo_b.png"
import { Link } from "react-router-dom";
import { authService } from '../myBase';

const Header = ({ loggedInUser, userType }) => {
    const onLogOutClick = () => {
        authService.signOut();
        window.location.reload();
    }
    const container = {
        padding: "10px",
        boxShadow: "1px 1px 7px 1px #0000001c",
    }

    const seperator = {
        margin: "25px",
        height: "19px",
        borderRight: "2px solid black",
    }

    const LinkLogin = {
        color: 'black',
        fontWeight: 600,
        marginLeft: '60vw'
    }

    return (
        <Nav className="align-items-center" style={container}>
            <div id="logo">
                <Link to="/">
                    <img src={logoImage} alt="Logo" />
                </Link>
            </div>
            <div id="seperator" style={seperator} ></div>

            {loggedInUser && <NavItem> <Link to="#" > Profile </Link></NavItem>}
            <NavItem>
                <Link to="#">
                    Board
                </Link>
            </NavItem>
            <NavItem>
                <Link to="#">
                    Help
                </Link>
            </NavItem>
            {!loggedInUser

                ?
                <NavItem>
                    <Link to="/login" style={LinkLogin}>
                        Login
                </Link>
                </NavItem>

                :
                <div className="d-flex ml-5" style={{ columnGap: '10px' }}>
                    <div><p style={{ textTransform: 'uppercase' }}>{userType}</p></div>
                    <div>Score</div>
                    <Link to='/' onClick={onLogOutClick}>Logout</Link>
                </div>

            }

        </Nav >
    )
}

export default Header
