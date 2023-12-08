import React, { useEffect, useState } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import "./ProductDetails.css";
import Services from '../Services';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductDetails({ addToCart}) {

    const [product, setProduct] = useState({});
    const { productId } = useParams();

    const HOST_URL = 'https://shop-api-763v.onrender.com';

    useEffect(() => {
        axios.get(`${HOST_URL}/product/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [productId]);



    // Updated function to return both new price and discount flag
    const calculateNewPrice = () => {
        if (product.discount && product.discount > 0) {
            const discountAmount = product.originalPrice * (product.discount / 100);
            return { newPrice: product.originalPrice - discountAmount, hasDiscount: true };
        }
        return { newPrice: product.originalPrice, hasDiscount: false }; // Return original price with discount flag as false
    };

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
                                        {/* Check for discount */}
                                        {product.discount && product.discount > 0 ? (
                                            <>
                                                <strong>${calculateNewPrice().newPrice.toFixed(2)}</strong> &nbsp;
                                                <small className="del_price">
                                                    <del>${product.originalPrice}</del>
                                                </small>
                                            </>
                                        ) : (
                                            <strong>${product.originalPrice}</strong>
                                        )}
                                    </h2>
                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                </div>
                                <div className="badge">
                                    {product.inStock > 0 ? (
                                        <span className="in_stock"><IoMdCheckmark />In Stock</span>
                                    ) : (
                                        <span className="out_of_stock"><IoMdClose />Out of Stock</span>
                                    )}

                                </div>
                            </div>
                            <div className="separator"></div>
                            <div className="prod_details_info">
                                <h5>Description</h5>
                                {/* <p>{product.info}</p> */}
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_buy_btn">
                                <AddToCartButton
                                    productId={product.id}
                                    addToCart={addToCart}
                                    // userId={userId}
                                />
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
