import React, { useState, useEffect } from "react";
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import LoginPage from "../routes/LoginPage";
import Header from "../components/Header";
import { authService, realtimeDB } from "../myBase";
import NavBar from "./NavBar";
import Board from "../routes/Board";


const AppRouter = ({ isLoggedIn, userObj }) => {
    const [userType, setUserType] = useState('')

    useEffect(() => {
        try {
            authService.onAuthStateChanged(async (user) => {
                if (user) {
                    await realtimeDB.ref('users/' + authService.currentUser.uid + '/userType').on("value", (snapshot) => {
                        setUserType(snapshot.val())
                    })
                    console.log("Now usertype is: " + userType)

                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [userType])
    return (
        <>
            <Router>
                <Switch>
                    {isLoggedIn ?
                        <>

                            <Route exact path="/">
                                <NavBar loggedInUser={isLoggedIn} userType={userType} />

                            </Route>

                            <Route exact path="/login" >
                                <Redirect to="/" />
                            </Route>

                            <Route exact path="/profile">
                                {/* <Header loggedInUser={isLoggedIn} userType={userType} /> */}
                                <NavBar loggedInUser={isLoggedIn} userType={userType} />
                                <Profile userObj={userObj} />
                            </Route>

                            <Route exact path="/board/">
                                <NavBar loggedInUser={isLoggedIn} userType={userType} />
                                <Board />
                            </Route>

                        </>

                        :

                        <>
                            <Route exact path="/">
                                <Header loggedInUser={isLoggedIn} />
                                <Auth />
                            </Route>

                            <Route exact path="/login">
                                <LoginPage />
                            </Route>
                        </>

                    }


                </Switch>
            </Router >
        </>
    );
};
export default AppRouter;
