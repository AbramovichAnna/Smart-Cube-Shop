import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { HOST_URL } from '../../common/constants.js';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import { Link } from 'react-router-dom';
import './FeaturedSlider.css';

export default function FeaturedSlider({ products }) {

    const featuredProducts = products.filter(product => product.tag === 'featured-product');

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {featuredProducts.map((product, index) => {
                    const imageUrl = `${HOST_URL}${product.image}`;
                    return (
                        <SwiperSlide
                            key={index}
                            className="featured_slides"
                        >
                            <div className="featured_title">{product.title}</div>
                            <figure className="featured_img">
                                <Link to={`/product/${product.id}`} className="btn-featured">
                                    <img src={imageUrl} alt="product-img" />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {product.originalPrice}$
                            </h2>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
