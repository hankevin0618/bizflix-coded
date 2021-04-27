import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Subscription from "../routes/Subscription";

const AppRouter = ({ isLoggedIn, userObj }) => {
    const [verified, setVerified] = useState(true)

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
