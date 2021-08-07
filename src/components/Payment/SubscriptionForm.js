import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../../css/Payment.css';
import { authService, realtimeDB } from '../../myBase';

export default function SubscriptionForm({ email }) {

    const [error, setError] = useState('');

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "black",
                fontWeight: 500,
                fontFamily: "Roboto",
                fontSize: "16px",
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    const stripe = useStripe();
    const elements = useElements();


    const handleSubmitSub = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // stripe has not yet loaded.
            // Make sure to disable the form submission until stripe.js has loaded
            return;
        }
        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email
            }
        })

        if (result.error) {
            setError(result.error.message)
        } else {
            try {
                const res = await axios.post('http://localhost:4000/sub', { payment_method: result.paymentMethod.id, email: email, })
                // console.log(res.data)

                const { client_secret, status } = res.data;

                if (status === 'requires_action') {
                    stripe.confirmCardPayment(client_secret).then((result) => {
                        if (result.error) {
                            // display error message, the card was declined
                            console.log('There was an error')
                            console.log(result.error)
                        } else {
                            // show success message
                            console.log('You paid successfully')
                        }
                    })
                } else {
                    // no additional information was added, success message to show
                    console.log('You paid successfully')

                }

                // Add customerID to user's database
                if (res.data.customerID) {
                    console.log(res.data.customerID)

                    realtimeDB.ref('users/' + authService.currentUser.uid).update({
                        customerID: res.data.customerID,
                        subscribing: true
                    })
                }
            } catch (error) {
                console.log(error)
                setError(error.message)
            }

        }

    }



    return (
        <>
            <form className="text-black" onSubmit={handleSubmitSub}>
                <fieldset className="FormGroup">
                    <div className="FormRow " style={{ color: 'black' }}>
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <p className="text-center" style={{ color: 'red' }}>{error}</p>
                <div className="w-50 col-md-12 d-block mx-auto">
                    <input type="submit" value="Subscribe" className="main-button" />
                </div>
            </form>
        </>
    )
}
