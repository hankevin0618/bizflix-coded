import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { authService, realtimeDB } from "../myBase";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Subscription from "../routes/Subscription";

const AppRouter = ({ isLoggedIn, userObj }) => {
    const [verified, setVerified] = useState(true)
    useEffect(() => {
        if (userObj !== null) {
            const checkVerification = async () => {
                try {
                    await realtimeDB.ref('users/' + authService.currentUser.uid + '/verified').on("value", function (snapshot) {
                        setVerified(snapshot.val())
                    })
                } catch (error) {
                    console.log(error)
                }

                console.log('Verification is: ' + verified)
            }
            checkVerification()
        }

    }, [verified])

    return (
        <Router>
            <Switch>
                {isLoggedIn && !verified &&
                    <>
                        <Route exact path="/">
                            <Subscription userObj={userObj} setVerified={setVerified} />
                        </Route>
                    </>
                }

                {isLoggedIn && verified &&
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} setVerified={setVerified} />
                        </Route>
                    </>
                }

                <>
                    <Route exact path="/">
                        <Auth setVerified={setVerified} />
                    </Route>
                </>

            </Switch>
        </Router >
    );
};
export default AppRouter;
