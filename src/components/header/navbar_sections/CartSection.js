import React from 'react';
import { Link } from 'react-router-dom';


function CartSection({ cartItems=[], handleToggle }) {

    // Function to render cart items
    const renderCartItems = () => {
        return cartItems.map(item => (
            <li className="cart-item" key={item.id}>
                <div className="cart-item-details">
                    <h6>{item.name}</h6>
                    <p>Unit Price: <span>${item.price}</span></p>
                    {/* Add actions for item quantity update here */}
                </div>
            </li>
        ));
    }

    return (
        <div className="toolbar-section cart" id="cart">
            <div className="inner">
                {cartItems.length === 0 ? (
                    // Case: Cart is Empty
                    <div className="empty-page-content text-center">
                        <h3>Shopping Cart</h3>
                        <p className="cart-empty-message mb-5">Your cart is currently empty.</p>
                        <Link to="/all-products" className="btn btn-primary" role='button'>Go To Shop</Link>
                    </div>
                ) : (
                    // Case: Items exist in Cart
                    <>
                        <ul className="cart-list">
                            {renderCartItems()}
                        </ul>
                        <Link
                            to="/cart"
                            className="btn btn-primary mr-3"
                            onClick={() => handleToggle(null)}
                        >
                            View Cart
                        </Link>
                        <Link
                            to="#"
                            className="btn btn-secondary"
                            onClick={() => handleToggle(null)}
                        >
                            Checkout
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default CartSection;
