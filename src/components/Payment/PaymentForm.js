import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
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


const PaymentForm = ({ productPrice }) => {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post("http://localhost:4000/payment", {
                    //   amount is in cents
                    amount: productPrice,
                    id: id
                })

                if (response.data.success) {
                    console.log("Successful Payment")
                    setSuccess(true)
                    // verified true
                }

            } catch (error) {
                console.error("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }


    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
                :
                <div>
                    <h2>You just boughta sweet spatula lol</h2>
                </div>

            }

        </>
    )
}

export default PaymentForm;