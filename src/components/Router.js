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


    useEffect(() => {
        if (isLoggedIn) {
            try {
                const GetCurrentCustomerID = async () => {
                    let userCID = await realtimeDB.ref('users/' + authService.currentUser.uid).on('value', (snapshot) => {
                        const data = snapshot.val();
                        // console.log('Found Customer ID: ' + data.customerID)
                        setCustomerID(data.customerID)
                        setLoading(false)
                    })

                    if (userCID) {
                        const res = await axios.post('http://localhost:4000/checkSub', { "customerID": customerID })
                        if (res.data.ok) {
                            setVerified(true)
                            setLoading(false)
                            // console.log('turned verified')
                        }
                    }
                }
                GetCurrentCustomerID()

            } catch (error) {
                console.log(error.message)
            }
        }

    }, [verified, customerID, isLoggedIn])




    return (
        <Router>
            <Switch>
                {/* 지금 subscribing page에서 home으로 넘어가니까, verification page 를 만들어서 좀더 스무스한 페이지 이동을 하자 */}

                {
                    isLoggedIn && loading &&
                    <Loading />
                }

                {isLoggedIn && verified &&
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} setVerified={setVerified} />
                        </Route>
                    </>
                }

                {isLoggedIn && !verified &&
                    <>
                        <Route exact path="/">
                            <Subscription userObj={userObj} setVerified={setVerified} />
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
