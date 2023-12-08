import React from 'react'
import Services from '../components/Services'
import HeroSlider from '../components/slider/HeroSlider';
import FeaturedSlider from '../components/slider/FeaturedSlider';
import BrandsSlider from '../components/slider/BransSlider';
import { TbSeparator } from 'react-icons/tb';


function HomePage({ products, brands }) {
    console.log("HomePage");
    return (
        <>
            <section id="hero">
                <HeroSlider products={products}/>
            </section>
            <div className="separator"></div>
            <section id="featured" className="section">
                <div className="container">
                    <div className="section_head">
                        <h2 className="heading">"Featured Products"</h2>
                    </div>
                    <FeaturedSlider products={products}/>
                </div>
            </section>
            <div className="separator"></div>
            <section id="brands" className="section">
                <div className="container">
                    <div className="section_head">
                        <h2 className="heading">"Top Brands"</h2>
                    </div>
                    {/* <BrandsSlider brands={brands} /> */}
                </div>
            </section>
            <section id="products" className="section">
                <div className="container">
                    {/* <SectionsHead heading="Top Products" /> */}
                    <div className="section_head">
                        <h2 className="heading">"Top Products"</h2>
                    </div>
                    {/* <TopProducts /> */}
                </div>
            </section>
            <Services />
        </>
    )
}

export default HomePage