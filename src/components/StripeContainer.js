import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_live_GVOP0nWue8vt5hVI1WvIl9VG";

const stripeTestPromise = loadStripe(PUBLIC_KEY)
const StripeContainer = ({ productPrice }) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm productPrice={productPrice} />
        </Elements>
    )
}

export default StripeContainer;