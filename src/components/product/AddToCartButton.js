import React from 'react';


function AddToCartButton({ productId, addToCart }) {

    return <button className="btn products_btn " onClick={() => addToCart(productId)}>Add to Cart</button>;
}

export default AddToCartButton;
