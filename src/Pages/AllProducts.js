import React, { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import "./AllProducts.css";
import { Link, useLocation } from 'react-router-dom';

function AllProducts({ products, categories, onAddToCart }) {
    console.log("AllProducts Page");

    const [category, setCategory] = useState("");
    const location = useLocation();
    const searchQuery = location.state?.searchQuery?.toLowerCase() || "";
    console.log("Received search query:", searchQuery);
    // console.log('Sample product:', products[0]);
    // console.log("Filtered Products:", filteredProducts);
    const filteredProducts = products.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchQuery)) ||
        (product.description && product.description.toLowerCase().includes(searchQuery))
    );

    
    return (
        <section id="all_products" className="product-section">
            <div className="container">
                <div className="categories-nav">
                    {categories.map((category) => (
                        <ul key={category.id} className="nav-item">
                            <Link to="/all-products"
                                onClick={() => setCategory(category.id)}
                            >
                                {category.name}
                            </Link>
                        </ul>
                    ))}
                </div>
                <div className="wrapper products_wrapper">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={onAddToCart}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AllProducts;
