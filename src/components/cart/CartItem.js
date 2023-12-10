import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { HOST_URL } from '../../common/constants.js';
import './CartItem.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function CartItem({ item,onIncrease, onDecrease, onRemove }) {
    const navigate = useNavigate();


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
                    <Link to={`/product/${item.product.id}`}>
                    <img src={`${HOST_URL}${item.product.image}`} alt={item.product.title} />
                    </Link>
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
                <button onClick={onDecrease}>
                        <FaMinus />
                    </button>
                    <span className="quantity_count" style={{ fontWeight: "700" }}>{item.quantity}</span>
                    <button onClick={onIncrease}>
                        <FaPlus />
                    </button>
                </div>
                <button className="btn-delete" onClick={onRemove}>
                    <GoTrash />
                </button>
            </div>
        </div>

    );
}

export default CartItem;
