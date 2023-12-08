import React from 'react';
import ProductCard from '../components/product/ProductCard';
import "./AllProducts.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';




function AllProducts({ products, onAddToCart,categories }) {
    console.log("AllProducts Page");
    console.log("all products : ", products);
    console.log("categoties : ", categories);

    const [category, setCategory] = useState("");

    


    // --------------------------------------------------- RENDER ALL PRODUCTS COMPONENT----------------------------------------------
    return (
        <section id="all_products" className="product-section">
            <div className="container">
                <div className="categories-nav">
                    {categories.map((category) => (
                        <ul key={category.id} className="nav-item">
                            <Link to="/all-products"
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
                        addToCart={onAddToCart}
                        />
                        
                    ))}
                </div>
            </div>
        </section>

    );
};

export default AllProducts;

