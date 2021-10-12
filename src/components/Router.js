import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "../views/Auth";
import Home from "../views/Home";
import Loading from "./Elements/Loading";
import InnerCourse from "./Course/InnerCourse";
import Subscription from "../views/Subscription";
import { authService, realtimeDB } from "../myBase";
import axios from "axios";
import MyAccount from "../views/MyAccount";
import Header from "./Header";

const AppRouter = ({ isLoggedIn, userObj }) => {

    const [loading, setLoading] = useState(false)
    const [isSubscribing , setIsSubscribing] = useState(false)
    const [customerID , setCustomerID] = useState(null)


    useEffect(() => {
        if (isLoggedIn) {
            const CheckSubscribing = async () => {
                await realtimeDB.ref('users/' + authService.currentUser.uid).on('value', (snapshot) => {
                    const data = snapshot.val();
                    setCustomerID(data.customerID)
                })

                if (customerID) {
                    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkSub`, { "customerID": customerID })
                    if (res.data.ok) {
                        setIsSubscribing(true)
                    } 
                } else{
                    setIsSubscribing(false)
                }
            }
            CheckSubscribing()

            setLoading(false)

        } else {
            return null;
        }



    })

    const HandleAuth = () => {

        if (!isLoggedIn) {
            return (
                <Route exact path="/">
                    <Auth userObj={userObj} setLoading={setLoading} />
                </Route>
            )
        }


        return (
        <>
            <Route exact path="/">
                <Home userObj={userObj} setLoading={setLoading} />
            </Route>
            <Route path="/course/:categoryID/:episode">
                <InnerCourse isSubscribing={isSubscribing} />
            </Route>
            <Route path="/payment">
            {
                !isSubscribing 
                ?
                <Subscription />
                :
                <Redirect to="/" />
            }
            </Route>
        </>
        )
        
    }

    return (
        <Router>
            {
                isLoggedIn &&
                <Header isSubscribing={isSubscribing} />
            }
            <Switch>
                {loading ?
                    <Loading />
                    :
                    <>
                        <HandleAuth />
                        <Route path="/my-account">
                            <MyAccount isSubscribing={isSubscribing} />
                        </Route>
                    </>

                }
            </Switch>
        </Router>
    )
};
export default AppRouter;
