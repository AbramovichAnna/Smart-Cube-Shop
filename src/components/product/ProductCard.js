import React from 'react';
import "./ProductCard.css";
import { IoMdStar } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { HOST_URL } from '../../common/constants.js';
import AddToCartButton from './AddToCartButton.js';

function ProductCard({ product, addToCart }) {
    const imageUrl = `${HOST_URL}${product.image}`;
    const navigate = useNavigate();

    console.log("product : ", product);

    if (!product) {
        return <div>Loading...</div>;
    }

    const navigateToProductDetails = () => {
        navigate(`/product/${product.id}`);
    };

    // Function to render ratings stars 
    const renderStars = () => {
        const rating = parseInt(product.ratings, 10); // Convert to number if it's a string
        return [...Array(rating)].map((_, i) => <IoMdStar key={i} />);
    };

    // Updated function to return both new price and discount 
    const calculateNewPrice = () => {
        if (product.discount && product.discount > 0) {
            const discountAmount = product.originalPrice * (product.discount / 100);
            return { newPrice: product.originalPrice - discountAmount, hasDiscount: true };
        }
        return { newPrice: product.originalPrice, hasDiscount: false }; // Return original price with discount flag as false
    };

    // --------------------------------------------------- RENDER PRODUCT CARD COMPONENT----------------------------------------------
    return (
        <div className="card products_card">
            <div className="products_img">
                <img src={imageUrl} alt="product-img" onClick={navigateToProductDetails} />
            </div>

            <div className="products_details">
                <span className="rating_star">{renderStars()}</span>
                <h5 className="products_title" onClick={navigateToProductDetails} style={{ fontWeight: "700" }}>{product.title}</h5>
                <h5 className="products_info">Brand : {product.brand}</h5>
                <div className="separator"></div>
                <h4 className="products_price">
                    {calculateNewPrice().hasDiscount ? ( // Display original and sale price if there's a discount
                        <>
                            <strong>${calculateNewPrice().newPrice.toFixed(2)}</strong> &nbsp;
                            <small style={{color: "gray"}}><del>${product.originalPrice}</del></small>
                        </>
                    ) : (
                        <strong>${product.originalPrice}</strong> // Display original price only
                    )}
                </h4>
                {/* Display stock status */}
                <p className="stock_status">
                    {product.inStock > 0 ? "In Stock" : "Not Available"}
                </p>
                <AddToCartButton
                    productId={product.id} 
                    addToCart={addToCart}
                    // userId={userId}
                />
            </div>
        </div>
    );
}

export default ProductCard;
