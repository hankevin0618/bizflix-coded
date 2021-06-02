import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import logoImage from "../images/logo_b.png"
import { authService, realtimeDB } from '../myBase';


const NavBar = ({ loggedInUser, userType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rate, setRate] = useState(0)

    let location = useLocation();
    let getNavMenu = location.pathname.slice(1) + 'Nav'
    const getRate = async () => {
        await realtimeDB.ref('users/' + authService.currentUser.uid + '/rate').on("value", function (snapshot) {
            setRate(snapshot.val())
        })
    }



    useEffect(() => {
        getRate()
        if (location.pathname !== '/') {
            try {
                document.getElementById(getNavMenu).classList.add('active')

            } catch (error) {
                throw new Error(error)
            }

        }

    }, [getNavMenu])

    let history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
        window.location.reload();
    }
    const LinkLogin = {
        color: 'black',
        fontWeight: 600,
        marginLeft: '60vw'
    }

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><img width="130px" src={logoImage} alt="Logo" /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {loggedInUser &&
                            <NavItem>
                                <NavLink id="profileNav" href="/profile">Profile</NavLink>
                            </NavItem>
                        }

                        <NavItem>
                            <NavLink href="/board" id="boardNav">Board</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/team" id="teamNav">Team</NavLink>
                        </NavItem>

                        {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                             </DropdownItem>
                                <DropdownItem>
                                    Option 2
                              </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                              </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                    {!loggedInUser

                        ?
                        <NavItem>
                            <Link to="/login" style={LinkLogin}>
                                Login
</Link>
                        </NavItem>

                        :
                        <div className="d-flex ml-5" style={{ columnGap: '10px' }}>
                            <div><p>Hi, {authService.currentUser.displayName}!</p></div>
                            <div><p style={{ textTransform: 'uppercase' }}>{userType}</p></div>
                            <div>Rate: {rate} </div>
                            <Link to='/' onClick={onLogOutClick}>Logout</Link>
                        </div>

                    }
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar