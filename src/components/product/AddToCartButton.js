import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa'; // Import the icon

function AddToCartButton({ productId, addToCart }) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(productId);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 4000);
    };

    return (
        <button
            className={`btn products_btn ${isAdded ? 'added-to-cart' : ''}`}
            onClick={handleAddToCart}
        >
            {isAdded ? <><FaCheck /> Added</> : 'Add to Cart'}
        </button>
    );
}

export default AddToCartButton;
