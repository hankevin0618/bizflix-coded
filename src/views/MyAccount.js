import Loading from '../components/Elements/Loading'
import { useEffect, useState } from "react";
import { authService, realtimeDB } from "../myBase";
import axios from "axios";
import {Link} from 'react-router-dom'

const MyAccount = ({isSubscribing}) => {
    const [loaded, setLoaded] = useState(false)
    

    const onUnsubscribe = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to unsubscribe?')) {
            try {
                let customerID;
                setLoaded(false)
                await realtimeDB.ref('users/' + authService.currentUser.uid).on('value', (snapshot) => {
                    const data = snapshot.val();
                    customerID = data.customerID;
                })

                if(customerID){
                    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/unsubscribe`, { customerID })
                    if (res.data.ok) {
                        realtimeDB.ref('users/' + authService.currentUser.uid).update({
                            subscribing: false
                        })
                        window.location.reload();
                        console.log("Successfully Unsubscribed")
                    } else {
                        console.log(res.data.error)
                    }
                }

                setLoaded(true)
            } catch (error) {
                console.error(error)
            }
           
            
        }
    }
    
    
    
    
    useEffect(() => {
        setLoaded(true)
    }, [])


    return(
    <>
        {
            !loaded
            ?
            <>
                <Loading />
            </>
            :
            <>
            <div className="container-fluid" style={{backgroundImage:"radial-gradient(#2a2a2a, #1c1a1a)"}}>
                <div className="row">
                    <div className="d-flex mt-5 text-white" style={{minHeight:'100vh'}}>
                        <div>
                            {
                                isSubscribing
                                ?
                                <div>
                                    <h2>Unsubscribe</h2>
                                    <button className="main-button mx-1" style={{ color: '#00eeff' }} onClick={onUnsubscribe}>Unsubscribe</button>
                                </div>
                                :
                                <div>
                                    <h3>You are not subscribing</h3>
                                    <Link to="/payment">Go to Payment Page</Link>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            </>

        }

    </>
    )
}

export default MyAccount;