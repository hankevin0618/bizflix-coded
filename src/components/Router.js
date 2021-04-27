import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import LoginPage from "../routes/LoginPage";
import Header from "../components/Header";



const AppRouter = ({ isLoggedIn, userObj }) => {


    return (
        <>
            <Router>

                <Switch>
                    {isLoggedIn ?
                        <>
                            <Header loggedInUser={isLoggedIn} />
                            <Route exact path="/">
                                <Home userObj={userObj} />
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
