import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { authService, realtimeDB } from "../myBase";
import axios from 'axios';

import Auth from "../views/Auth";
import Home from "../views/Home";
import Subscription from "../views/Subscription";
import Loading from "./Elements/Loading";

const AppRouter = ({ isLoggedIn, userObj }) => {


    const [verified, setVerified] = useState(false)
    const [customerID, setCustomerID] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showSubscription, setShowSubscription] = useState(false)

    const GetCurrentCustomerID = async () => {
        await realtimeDB.ref('users/' + authService.currentUser.uid).on('value', (snapshot) => {
            const data = snapshot.val();
            // console.log('Found Customer ID: ' + data.customerID)
            setCustomerID(data.customerID)

        })

        if (customerID) {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkSub`, { "customerID": customerID })
            if (res.data.ok) {
                await setVerified(true)
                setLoading(false)
                // console.log('turned verified')
            } else {
                setShowSubscription(true)
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (isLoggedIn && !verified) {
            try {
                GetCurrentCustomerID()
            } catch (error) {
                console.log(error.message)
            }
        }

    }, [verified, customerID, isLoggedIn])




    return (
        <Router>
            <Switch>
                {
                    isLoggedIn && loading &&
                    <Loading />
                }

                {isLoggedIn && verified &&
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} setLoading={setLoading} />
                        </Route>
                    </>
                }

                {isLoggedIn && showSubscription &&
                    <>
                        <Route exact path="/">
                            <Subscription />
                        </Route>
                    </>
                }



                <>
                    <Route exact path="/">
                        <Auth setVerified={setVerified} setLoading={setLoading} />
                    </Route>
                </>

            </Switch>
        </Router >
    );
};
export default AppRouter;
