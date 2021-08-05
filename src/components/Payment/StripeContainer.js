import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
<<<<<<< HEAD:src/components/StripeContainer.js
=======
// import PaymentForm from './PaymentForm';
>>>>>>> c4b5516bb746fb70d213481cdbd04a8b10b78fdb:src/components/Payment/StripeContainer.js
import SubscriptionForm from './SubscriptionForm';
import { authService } from '../myBase';
const PUBLIC_KEY = "pk_test_9ppcBpnAklh6c1jxi0Bzlo5V";

const stripeTestPromise = loadStripe(PUBLIC_KEY)
const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <SubscriptionForm email={authService.currentUser.email} />
        </Elements>
    )
}

export default StripeContainer;