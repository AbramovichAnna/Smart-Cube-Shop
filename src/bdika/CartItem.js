import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import { FaMinus, FaPlus } from 'react-icons/fa';



function CartItem() {

    return (
        <div>
            <h3>{item.product.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.originalPrice}</p>
            <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
        </div>
        
    );
}

export default CartItem;


