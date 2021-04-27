import React from "react"
import { Nav, NavItem } from 'reactstrap'
import logoImage from "../images/logo_b.png"
import { Link } from "react-router-dom";

const Header = ({ loggedInUser }) => {

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
            <NavItem>
                <Link href="#">
                    Board
                </Link>
            </NavItem>
            <NavItem>
                <Link href="#">
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

                <NavItem>
                    <Link href="#" style={LinkLogin}>
                        Logout
                </Link>
                </NavItem>

            }

        </Nav >
    )
}

export default Header
