import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { HOST_URL } from '../../common/constants.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './BrandSlider.css';

export default function BrandSlider() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const brandsResponse = await axios.get(`${HOST_URL}/brands`);
                setBrands(brandsResponse.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    // console.log('brands', brands);

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="brandSwiper"
            >
                {brands.map((brand) => {
                    const imageUrl = `${HOST_URL}${brand.image}`;
                    return (
                        <SwiperSlide key={brand.id} className="brand_slide">
                            <Link to={`/brand/${brand.id}`}>
                                <img src={imageUrl} alt={brand.name} />
                            </Link>
                            <div className="brand_name">{brand.name}</div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
