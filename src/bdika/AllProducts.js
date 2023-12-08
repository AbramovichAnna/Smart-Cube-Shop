import React from 'react';
import ProductCard from '../components/product/ProductCard';
import "./AllProducts.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';




function AllProducts({ products, categories, setProducts }) {
    console.log("AllProducts Page");
    console.log("all products : ", products);
    console.log("categoties : ", categories);

    const [category, setCategory] = useState("");


    const addToCart = (product) => {
        // Functionality to add product to cart
    };

// --------------------------------------------------- RENDER ALL PRODUCTS COMPONENT----------------------------------------------
    return (
        <section id="all_products" className="product-section">
            <div className="container">
                <div className="categories-nav">
                    {categories.map((category) => (
                        <ul key={category.id} className="nav-item">
                            <Link to="/"
                                onClick={() => {
                                    setCategory(category.id);
                                    // handleSearch(searchText);
                                }}
                            >
                                {category.name}
                            </Link>
                        </ul>
                    ))}
                </div>
                <div className="wrapper products_wrapper">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </section>

    );
};

export default AllProducts;

