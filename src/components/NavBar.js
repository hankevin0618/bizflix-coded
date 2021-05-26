import React, { useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import logoImage from "../images/logo_b.png"
import { authService } from '../myBase';


const NavBar = ({ loggedInUser, userType }) => {
    const [isOpen, setIsOpen] = useState(false);

    let location = useLocation();

    let test = location.pathname.slice(1) + 'Nav'

    // if (!document.getElementById(test).classList.contains('active')) {
    //     document.getElementById(test).classList.add('active')
    // }


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
                            <NavLink href="/board">Board</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
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
                        </UncontrolledDropdown>
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
                            <div><p style={{ textTransform: 'uppercase' }}>{userType}</p></div>
                            <div>Score</div>
                            <Link to='/' onClick={onLogOutClick}>Logout</Link>
                        </div>

                    }
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar