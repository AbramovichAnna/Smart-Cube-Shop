import React from 'react';
import CartItem from '../../cart/CartItem'; // Adjust the path as needed

function CartSection({ cartItems = [], onIncrease, onDecrease, onRemove }) {
    if (!cartItems) {
        return <div>Loading cart items...</div>;
    }

    return (
        <div className="cart-section-container">
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-section">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.product.id}
                            item={item}
                            onIncrease={() => onIncrease(item)}
                            onDecrease={() => onDecrease(item)}
                            onRemove={() => onRemove(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CartSection;
