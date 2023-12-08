import React from 'react';
import { HOST_URL } from '../../common/constants.js';

function CartItem({ item, updateCart, removeFromCart}) {
    console.log("Cart Item");
    



    return (
        <div className="cart-item">
            <img src={`${HOST_URL}${item.product.image}`} alt="product-img" />
            <div>
                <h4>{item.product.title}</h4>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => updateCart(item.product, item.quantity + 1)}>+</button>
                <button onClick={() => updateCart(item.product, item.quantity - 1)}>-</button>
                <button onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
        </div>
    );
}

export default CartItem;
