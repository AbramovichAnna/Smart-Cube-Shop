import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem'; // Import the CartItem component

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from the database
        axios.get('http://localhost:8000/cart')
            .then(response => setCartItems(response.data))
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:8000/cart/${productId}`)
            .then(response => {
                // Remove the item from the cartItems state
                setCartItems(cartItems.filter(item => item.product.id !== productId));
            })
            .catch(error => console.error("Error deleting item: ", error));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <CartItem key={item.product.id} item={item} removeFromCart={removeFromCart} />
            ))}
        </div>
    );
}

export default Cart;
