import React, { useState } from 'react';
import ProductCard from './ProductCard';
import "./AllProducts.css";
import { useLocation } from 'react-router-dom';
import useActive from '../hooks/useActive';



function AllProducts({ products, onAddToCart }) {
    // console.log("AllProducts Page");

    //  SEARCH QUERY
    const location = useLocation();
    const searchQuery = location.state?.searchQuery?.toLowerCase() || "";

    const [displayedProducts, setDisplayedProducts] = useState(products);
    const { activeClass, handleActive } = useActive(0);

    //set of product's category
    const productsCategory = [
        'All',
        ...new Set(products.map(product => product.category))
    ];

    //product's filtering
    const handleProducts = (category, i) => {
        let filteredProducts;
        if (category === 'All') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(product => product.category === category);
        }
        setDisplayedProducts(filteredProducts);
        handleActive(i);
    };

    // Filter based on search query
    const filteredDisplayedProducts = displayedProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <section id="all_products" className="product-section">
            <div className="container">
                <div className="section_head">
                    <h3 className="heading" style={{ fontWeight: "700", fontFamily: "Montserrat" }}>All Products</h3>
                </div>
                <div className="products_filter_tabs">
                    <ul className="tabs">
                        {productsCategory.map((item, index) => (
                            <li
                                key={index}
                                className={`tabs_item ${activeClass(index)}`}
                                onClick={() => handleProducts(item, index)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="wrapper products_wrapper">
                    {filteredDisplayedProducts.map((product) => (
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
