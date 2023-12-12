import React from 'react';
import CartItem from './CartItem';
import "./Cart.css";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, onIncrease, onDecrease, onRemove }) {
    const navigate = useNavigate();
    useEffect(() => {
        // console.log("Current cartItems:", cartItems);
    }, [cartItems]);

    // ORDER SUMMARY
    const calculateOrderSummary = () => {
        let originalPriceTotal = 0;
        let discountTotal = 0;
        let newPriceTotal = 0;

        cartItems.forEach((item) => {
            const originalPrice = item.product.originalPrice;
            const discount = item.product.discount || 0;
            const discountAmount = originalPrice * (discount / 100);
            const newPrice = originalPrice - discountAmount;

            originalPriceTotal += originalPrice * item.quantity;
            discountTotal += discountAmount * item.quantity;
            newPriceTotal += newPrice * item.quantity;
        });
        return {
            originalPriceTotal: originalPriceTotal.toFixed(2),
            discountTotal: discountTotal.toFixed(2),
            newPriceTotal: newPriceTotal.toFixed(2)
        };
    };
    const orderSummary = calculateOrderSummary();


    // HANDLE CHECKOUT
    const isLoggedIn = !!localStorage.getItem('token');
    const handleCheckout = () => {
        if (!isLoggedIn) {
            alert('Please login or register to proceed with checkout');
        } else {
            // Proceed with the checkout process
            navigate('/checkout');
            console.log('Proceeding to checkout...');
        }
    };

    return (
        <>
            <section id="cart" className="section">
                <div className="cart-container">
                    {cartItems.length === 0 ? (
                        <div className="empty_cart">
                            <h3 style={{ marginBottom: "20px", paddingBottom: "50px" }}>Your cart is empty</h3>
                            <button className="btn btn-primary" onClick={() => window.history.back()}>Continue Shopping</button>
                        </div>

                    ) : (
                        <div className="wrapper cart_wrapper">
                            <div className="cart_left_col">
                                {
                                    cartItems.map((item) => (
                                        <CartItem
                                            key={item.product.id}
                                            item={item}
                                            onIncrease={() => onIncrease(item)}
                                            onDecrease={() => onDecrease(item)}
                                            onRemove={() => onRemove(item)}

                                        />
                                    ))
                                }
                            </div>

                            <div className="cart_right_col">
                                <div className="order_summary">
                                    <h3>
                                        Order Summary &nbsp;
                                        {/* ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} ) */}
                                    </h3>
                                    <div className="order_summary_details">
                                        <div className="price">
                                            <span>Original Price</span>
                                            <b>${orderSummary.originalPriceTotal}</b>
                                        </div>
                                        <div className="discount">
                                            <span>Discount</span>
                                            <b>- ${orderSummary.discountTotal}</b>
                                        </div>
                                        <div className="delivery">
                                            <span>Delivery</span>
                                            <b>Free</b>
                                        </div>
                                        <div className="separator"></div>
                                        <div className="total_price">
                                            <b><small>Total Price</small></b>
                                            <b>${orderSummary.newPriceTotal}</b>
                                        </div>
                                    </div>
                                    <button type="button" className="btn checkout_btn" onClick={handleCheckout}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </section>
        </>
    );
}

export default Cart;
