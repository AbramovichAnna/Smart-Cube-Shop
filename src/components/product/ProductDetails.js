import React, { useEffect, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import "./ProductDetails.css";
import Services from '../Services';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetails({addToCart}) {

    const [product, setProduct] = useState({});
    const { productId } = useParams();

    const HOST_URL = 'https://shop-api-763v.onrender.com';
    // HOST_URL = "http://localhost:8000"

    useEffect(() => {
        getProductDetails();
    }, [productId]);

    function getProductDetails() {
        axios.get(`${HOST_URL}/product/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">
                        {/*Product Details Left-content*/}
                        <div className="prod_details_left_col">
                            <figure className="prod_details_img">
                                <img src={`${HOST_URL}${product.image}`} alt={product.title} />
                            </figure>
                        </div>

                        {/*Right-content*/}
                        <div className="prod_details_right_col">
                            <h3 className="prod_details_title" style={{ fontWeight: "700" }}>{product.title}</h3>
                            <div className="prod_specs">
                                <ul>
                                    <li>
                                        {product.brand && <>
                                                <h5>Brand</h5>
                                                <h5>{product.brand.name}</h5></>
                                        }
                                    </li>
                                    <li>
                                        {product.category && <>
                                                <h5>Category</h5>
                                                <h5>{product.category.name}</h5></>
                                        }
                                    </li>
                                    <li>
                                        {product.type && <>
                                                <h5>Type</h5>
                                                <h5>{product.type.name}</h5></>
                                        }
                                    </li>
                                </ul>
                            </div>


                            <div className="prod_details_ratings">
                                {/* Ratings and other details can go here */}
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {product.price} &nbsp;
                                        {/* Assuming there's a field for the discounted price */}
                                        <small className="del_price">
                                            <del>{product.originalPrice}</del>
                                        </small>
                                    </h2>
                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                </div>

                                <div className="badge">
                                    <span><IoMdCheckmark /> In Stock</span>
                                </div>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_offers">
                                <h4>Offers and Discounts</h4>
                                <ul>
                                    <li>No Cost EMI on Credit Card</li>
                                    <li>Pay Later & Avail Cashback</li>
                                    {/* Add more offers here */}
                                </ul>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_buy_btn">
                                <button
                                    type="button"
                                    className="btn"
                                onClick={addToCart}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Services />
        </>
    );
};

export default ProductDetails;



