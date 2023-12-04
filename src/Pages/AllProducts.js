import React from 'react';
import ProductCard from '../components/product/ProductCard';
import "./AllProducts.css";
import { Link } from 'react-router-dom';



function AllProducts({ addToCart, products, categories, brand }) {
    console.log("AllProducts Page");

    return (
        <section id="all_products" className="product-section">
            <div className="container">
                <div className="categories-nav">
                    {categories.map((category) => (
                        <ul key={category.id} className="nav-item">
                            <Link to="/"
                                // onClick={() => {
                                //     setCurrentCategory(category.id);
                                //     // handleSearch(searchText);
                                // }}
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

