import React from 'react';
import { Link } from 'react-router-dom';
import '../../cart/CartItem'
import CartItem from '../../cart/CartItem';


function CartSection({ cartItems }) {

    return (
        <div className="toolbar-section cart" id="cart">
            <div className="inner">
                {cartItems ? (
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
                            <CartItem />
                        </ul>
                        <Link
                            to="/cart"
                            className="btn btn-primary mr-3"
                        // onClick={() => handleToggle(null)}
                        >
                            View Cart
                        </Link>
                        <Link
                            to="#"
                            className="btn btn-secondary"
                        // onClick={() => handleToggle(null)}
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
