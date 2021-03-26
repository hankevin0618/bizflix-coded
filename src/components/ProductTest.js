import React, { useState } from 'react'
import StripeContainer from './StripeContainer';

const ProductTest = () => {
    const [showItem, setShowItem] = useState(false)
    const [productPrice, setProductPrice] = useState(0)


    const onPurchaseClick = () => {
        setShowItem(true);
        setProductPrice(100)
    }
    return (
        <div>
            {showItem ?
                <StripeContainer productPrice={productPrice} />
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