import React from 'react';
import "./ProductCard.css";
import { IoMdStar } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function ProductCard({ product, brand, addToCart }) {
    const HOST_URL = 'http://localhost:8000';
    const imageUrl = HOST_URL + product.image;
    const navigate = useNavigate();

    const navigateToProductDetails = () => {
        navigate(`/product/${product.id}`);
    };


    // Function to render stars based on the rating
    const renderStars = () => {
        const rating = parseInt(product.ratings, 10); // Convert to number if it's a string
        return [...Array(rating)].map((_, i) => <IoMdStar key={i} />);
    };

    // price after discount
    const calculateNewPrice = () => {
        if (product.discount && product.discount > 0) {
            const discountAmount = product.originalPrice * (product.discount / 100);
            return product.originalPrice - discountAmount;
        }
        return null; // Return null if there's no discount
    };

    return (
        <div className="card products_card">
            <div className="products_img">
                <img src={imageUrl} alt="product-img" onClick={navigateToProductDetails} />
            </div>
            <div className="products_details">
                <span className="rating_star">{renderStars()}</span>
                <h5 className="products_title" onClick={navigateToProductDetails} style={{fontWeight: "700"}}>{product.title}</h5>
                <h5 className="products_info">Brand : {product.brand.name}</h5>
                <div className="separator"></div>
                <h4 className="products_price">
                    {calculateNewPrice() !== null ? (
                        <>
                            <strong>${calculateNewPrice().toFixed(2)}</strong> &nbsp;
                            <small><del>${product.originalPrice}</del></small>
                        </>
                    ) : (
                        <strong>${product.originalPrice}</strong>
                    )}
                </h4>

                <button className="btn products_btn ">
                    Add to cart
                </button>

            </div>
        </div>
    );
}

export default ProductCard;

