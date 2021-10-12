import React, { useState } from 'react'
import { authService } from "../myBase";
import { useHistory } from "react-router-dom";
import StripeContainer from "../components/Payment/StripeContainer"

const Subscription = () => {
    const history = useHistory();
    const [isMonthly, setIsMonthly] = useState(true)

    const onLogOutClick = () => {
        authService.signOut();
        history.go(0);
        window.location.reload();
    };

    const onPlanSelect = (e) => {
        e.preventDefault()
        const {target: {options: {selectedIndex}}} = e
        
        switch (selectedIndex) {
            case 0:
                setIsMonthly(true)
                break;
            case 1:
                setIsMonthly(false)
                break;
            default:
                break;
        }


    }


    return (
        <>
            <section className="container-fluid" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <div className="row">
                    <div id="subscription-box" className="col-md-8 col-xl-7 p-0 d-flex m-auto mt-5" >
                        <div className="col-md-6 mb-3">
                            <h2 className="playfair-bold m-md-2">BizFlix</h2>
                            <div className="mt-5 text-center">
                                <div>
                                <label htmlFor="select-plan">Choose a plan:</label>
                                <select  name="select-plan" onChange={onPlanSelect} >
                                    <option value="monthly" defaultChecked>Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                </div>
                                
                                <h3 className="playfair-bold">Subscribe to Access</h3>
                                {
                                    isMonthly
                                    ?
                                    <span className="playfair-bold" style={{ fontSize: '25px', fontWeight: 'lighter' }}>$19.95/month</span>

                                    :
                                    <span className="playfair-bold" style={{ fontSize: '25px', fontWeight: 'lighter' }}>$155.40/yearly</span>
                                }
                            </div>
                            <div className="col-md-8 mx-auto d-block mt-3">
                                <p className="playfair-bold text-center" style={{ fontSize: '14px', fontWeight: 'lighter' }}>Business education has long been stale and boring. And typically delivered by those who have never owned a business before. We knew you wanted fast-paced, entertaining, fun, simple and accessible real-world knowledge from those who have lived, survived and thrived in the business world for decades.</p>
                            </div>
                            <StripeContainer isMonthly={isMonthly} />
                            <button className="transparent-button d-block mx-auto my-3" onClick={onLogOutClick}>Log Out</button>
                        </div>
                        <div className="col-md-6" style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_960_720.jpg")' }}>

                        </div>
                    </div>
                </div>
            </section >
        </>

    )
}

export default Subscription;

