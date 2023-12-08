import React from 'react';
import CartItem from './CartItem';
import axios from 'axios';
import { HOST_URL } from '../../common/constants';
import './Cart.css';

function Cart({ cartItems, setCartItems }) {
    console.log("Cart Page");



    const updateCart = (product, quantity) => {
        if (quantity <= 0) {
            removeFromCart(product);
        } else {
            axios.put(`${HOST_URL}/cart_items/${product.id}`, { quantity })
                .then(response => {
                    // Update the state with the new cart items
                    setCartItems(response.data);
                })
                .catch(error => console.error('Error updating cart item', error));
        }
    };


    const removeFromCart = (product) => {
        axios.delete(`${HOST_URL}/cart_items/${product.id}`)
            .then(() => {
                // Update the state to remove the item from the cart
                setCartItems(prevItems => prevItems.filter(item => item.product.id !== product.id));
            })
            .catch(error => console.error('Error removing item from cart', error));
    };


    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        updateCart={updateCart}
                        removeFromCart={removeFromCart}
                    />
                ))
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}

export default Cart;
