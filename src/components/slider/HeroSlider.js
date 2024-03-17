import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HOST_URL } from '../../common/constants.js';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';
import './HeroSlider.css';


export default function HeroSlider({ products }) {

    const heroProducts = products.filter(product => product.tag === 'hero-product');
    // console.log("heroProducts : ", heroProducts);

    return (
        <>
            <Swiper
                spaceBetween={150}
                centeredSlides={true}
                loop={true}
                speed={1200}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {heroProducts.map((product, index) => {
                    const imageUrl = `${HOST_URL}${product.image}`;
                    return (
                        <SwiperSlide
                            key={index}
                            className={`hero_wrapper hero_slide-${index}`}
                        >
                            <div className="hero_item_txt" data-brand={product.brand|| 'No Brand'}>
                                <h3>{product.title}</h3>
                                <h2 className="hero_price">
                                    {product.originalPrice}$ &nbsp;                      
                                </h2>
                                <Link to={`/product/${product.id}`} className="btn">Shop Now</Link>
                            </div>
                            <Link to={`/product/${product.id}`} className="hero_item_img">
                                <img src={imageUrl} alt="product-img" />
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper >
        </>
    );
}

