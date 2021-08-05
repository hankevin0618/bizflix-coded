import React, { useState } from 'react'
import StripeContainer from './StripeContainer';

const ProductTest = ({ setVerified }) => {
    const [showItem, setShowItem] = useState(true)
    const [productPrice, setProductPrice] = useState(0)


    const onPurchaseClick = () => {
        setShowItem(true);
        setProductPrice(100)
    }
    return (
        <div>
            {showItem ?
                <>
                    <h2 style={{ textAlign: 'center' }}>You're not subscribing.</h2>
                    <p style={{ textAlign: 'center' }} >To access, please subscribe.</p>
                    <StripeContainer setVerified={setVerified} productPrice={productPrice} />
                </>
                :
                <>
                    <h3>Product Name</h3>
                    <button onClick={onPurchaseClick}>hey</button>
                </>
            }
        </div>
    )
}

export default ProductTest;