import React from 'react'
import ProductTest from '../components/Payment/ProductTest';
import { authService } from "../myBase";
import { useHistory } from "react-router-dom";


const Subscription = ({ userObj, setVerified }) => {
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.go(0);
    };

    return (

        <div>
            <ProductTest setVerified={setVerified} />
            <button style={{ marginTop: '50px' }} onClick={onLogOutClick}>Log Out</button>
        </div>

    )
}

export default Subscription;

