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
    const [showSubscription, setShowSubscription] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true)
            console.log(showSubscription)


            const fetchData = async () => {
                await realtimeDB.ref('users/' + authService.currentUser.uid).on('value', (snapshot) => {
                    const data = snapshot.val();
                    setCustomerID(data.customerID)
                    console.log(customerID)
                })

                if (customerID) {
                    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkSub`, { "customerID": customerID })
                    if (res.data.ok) {
                        setVerified(true)
                    } else {
                        setShowSubscription(true)
                    }
                } else {

                }
            }
            fetchData()

            setLoading(false)

        } else {
            return null;
        }



    })

    const HandleAuth = () => {

        if (!isLoggedIn) {
            return (
                <Route exact path="/">
                    <Auth userObj={userObj} setVerified={setVerified} setLoading={setLoading} setShowSubscription={setShowSubscription} />
                </Route>
            )
        }

        if (verified) {
            return (
                <Route exact path="/">
                    <Home userObj={userObj} setLoading={setLoading} />
                </Route>
            )
        }

        if (showSubscription) {
            return (
                <Route exact path="/">
                    <Subscription />
                </Route>
            )
        }

        return (
            <Loading />
        )



    }

    return (
        <Router>
            <Switch>
                {loading ?
                    <Loading />
                    :
                    <>
                        <HandleAuth />
                    </>

                }
            </Switch>
        </Router>
    )
};
export default AppRouter;
