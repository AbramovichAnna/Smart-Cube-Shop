import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalDiscount, setTotalDiscount] = useState(0);

    const addToCart = (product) => {
        // Add product to the cart
    };

    const applyGiftCard = (giftcard) => {
        // Add gift card value to the total discount
        setTotalDiscount(currentDiscount => currentDiscount + giftcard.value);
    };

    const calculateTotal = () => {
        // Calculate the total price of the cart items
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        // Subtract the total discount from the cart total
        return total - totalDiscount;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, applyGiftCard, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};
