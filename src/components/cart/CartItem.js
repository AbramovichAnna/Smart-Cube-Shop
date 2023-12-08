import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { HOST_URL } from '../../common/constants.js';
import './CartItem.css';


function CartItem({ item,  onUpdateCartQty, onRemoveFromCart }) {
    // console.log("CartItem data:", item);
    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            onUpdateCartQty(item.product.id, item.quantity - 1);
        } else {
            onRemoveFromCart(item.product.id);
        }
    };

    const handleIncreaseQuantity = () => {
        if (item.quantity <= item.product.stock) {
            onUpdateCartQty(item.product.id, item.quantity + 1);
        }
    };

    const handleRemoveItem = () => {
        onRemoveFromCart(item.product.id);
    };

    const calculateNewPrice = (product) => {
        if (item.product.discount && item.product.discount > 0) {
            const discountAmount = item.product.originalPrice * (item.product.discount / 100);
            return { newPrice: item.product.originalPrice - discountAmount, hasDiscount: true };
        }
        return { newPrice: item.product.originalPrice, hasDiscount: false };
    };

    return (
        <div className="cart_item">
            <div className="cart_item_info">
                <figure className="cart_item_img">
                    <img src={`${HOST_URL}${item.product.image}`} alt={item.product.title} />
                </figure>
                <div className="cart_item_head">
                    <h4 className="cart_item_title">{item.product.title}</h4>
                </div>
                <h4 className="products_price">
                    {calculateNewPrice().hasDiscount ? (
                        <>
                            <strong>${calculateNewPrice().newPrice.toFixed(2)}</strong> &nbsp;
                            <small style={{ color: "gray" }}><del>${item.product.originalPrice}</del></small>
                        </>
                    ) : (
                        <strong>${item.product.originalPrice}</strong> // Display original price only
                    )}
                </h4>

                <div className="quantity_box">
                <button onClick={handleDecreaseQuantity}>
                        <FaMinus />
                    </button>
                    <span className="quantity_count" style={{fontWeight: "700"}}>{item.quantity}</span>
                    <button onClick={handleIncreaseQuantity}>
                        <FaPlus />
                    </button>

                </div>
                <button className="btn-delete" onClick={handleRemoveItem}>
                    <GoTrash />
                </button>
            </div>
        </div>

    );
}

export default CartItem;
