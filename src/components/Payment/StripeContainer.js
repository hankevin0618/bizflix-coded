import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionForm from './SubscriptionForm';
import { authService } from '../../myBase';

const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
const StripeContainer = ({isMonthly}) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <SubscriptionForm email={authService.currentUser.email} isMonthly={isMonthly} />
        </Elements>
    )
}

export default StripeContainer;