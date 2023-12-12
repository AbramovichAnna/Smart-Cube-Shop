import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import ProductCard from './ProductCard';
import useActive from '../hooks/useActive';
import './TopProducts.css';

const TopProducts = ({ products, onAddToCart }) => {

    const [displayedProducts, setDisplayedProducts] = useState(products);
    const { activeClass, handleActive } = useActive(0);
    // console.log("onAddToCart in TopProducts:", typeof onAddToCart); 

    //set of product's category
    const productsCategory = [
        'All',
        ...new Set(products.map(product => product.category))
    ];

    //product's filtering
    const handleProducts = (category, i) => {
        if (category === 'All') {
            setDisplayedProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === category);
            setDisplayedProducts(filteredProducts);
        }
        handleActive(i);
    };

    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    {productsCategory.map((item, i) => (
                        <li
                            key={i}
                            className={`tabs_item ${activeClass(i)}`}
                            onClick={() => handleProducts(item, i)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className=" products_wrapper">
                {displayedProducts.slice(0, 9).map(product => (
                    <ProductCard
                    key={product.id} 
                    product={product} 
                    addToCart={onAddToCart}
                    />
                ))}
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Browse All <br /> Products <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;
