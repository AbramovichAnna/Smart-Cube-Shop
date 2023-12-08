import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import { useParams } from 'react-router-dom';
import "./Cart.css";

function Cart() {
    const HOST_URL = "https://shop-api-763v.onrender.com";
    const [cartItems, setCartItems] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        // Fetch cart items from server
        axios.get(HOST_URL + "/cart_items")
            .then(response => setCartItems(response.data))
            .catch(error => console.error('Error fetching cart items', error));
    }, []);

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


