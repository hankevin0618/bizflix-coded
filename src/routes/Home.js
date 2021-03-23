import React from 'react'
import ProductTest from '../components/ProductTest';
import { authService } from "../myBase";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    return (
        <div>
            {/* <ProductTest /> */}
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}

export default Home;
