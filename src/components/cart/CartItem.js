import React from 'react';

function CartItem({ item, removeFromCart }) {
    return (
        <div>
            <h3>{item.product.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
        </div>
    );
}

export default CartItem;
