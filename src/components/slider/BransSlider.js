import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function BrandsSlider({ brands }) {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}

        >
            {brands.map((brand, index) => (
                <SwiperSlide
                    key={index}
                    className="brand_slides">
                    <img src={brand.image} alt={brand.name} />
                    <h3>{brand.name}</h3>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

