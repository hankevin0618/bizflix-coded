import React, { useState, useEffect } from "react";
import { Redirect, HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import LoginPage from "../routes/LoginPage";
import Header from "../components/Header";
import { authService, realtimeDB } from "../myBase";


const AppRouter = ({ isLoggedIn, userObj }) => {
    const [userType, setUserType] = useState('')
    useEffect(() => {
        try {
            authService.onAuthStateChanged((user) => {
                if (user) {
                    realtimeDB.ref('users/' + authService.currentUser.uid + '/userType').on("value", (snapshot) => {
                        setUserType(snapshot.val())
                    })
                    console.log("Now usertype is: " + userType)

                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [userObj, userType])
    return (
        <>
            <Router>
                <Switch>
                    {isLoggedIn ?
                        <>

                            <Route exact path="/">
                                <Redirect to="/profile" />

                            </Route>
                            <Route exact path="/login" >
                                <Redirect to="/" />
                            </Route>

                            <Route exact path="/profile">
                                <Header loggedInUser={isLoggedIn} userType={userType} />
                                <Profile userObj={userObj} />
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
