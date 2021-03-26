import React, { useEffect } from 'react'
import ProductTest from '../components/ProductTest';
import { authService, realtimeDB } from "../myBase";
import { useHistory } from "react-router-dom";
import SubscriptionForm from '../components/SubscriptionForm';


const Home = ({ userObj }) => {
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    return (

        <div>
            <ProductTest />
            <button onClick={onLogOutClick}>Log Out</button>
        </div>

    )
}

export default Home;

