import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from './PaymentForm';
import SubscriptionForm from './SubscriptionForm';
const PUBLIC_KEY = "pk_test_9ppcBpnAklh6c1jxi0Bzlo5V";

const stripeTestPromise = loadStripe(PUBLIC_KEY)
const StripeContainer = ({ productPrice, setVerified }) => {
    return (
        <Elements stripe={stripeTestPromise}>
            {/* <PaymentForm productPrice={productPrice} /> */}
            <SubscriptionForm email='kevin@navig8biz.com' setVerified={setVerified} />
        </Elements>
    )
}

export default StripeContainer;