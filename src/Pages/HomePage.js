import React from 'react'
import Services from '../components/services/Services';
import HeroSlider from '../components/slider/HeroSlider';
import FeaturedSlider from '../components/slider/FeaturedSlider';
import TopProducts from '../components/product/TopProducts';
import BrandSlider from '../components/slider/BrandSlider';



function HomePage({ products, onAddToCart }) {
    console.log("Welcome to Smart Cube Shop");
    
    return (
        <>
            <section id="hero">
                <HeroSlider products={products}/>
            </section>
            <div className="separator"></div>
            <section id="featured" className="section">
                <div className="container">
                    <div className="section_head">
                        <h3 className="heading" style={{fontWeight: "700", fontFamily: "Montserrat"}}>Featured Products</h3>
                    </div>
                    <FeaturedSlider products={products}/>
                </div>
            </section>
            <div className="separator"></div>
            <section id="brands" className="section">
                <div className="container">
                    <div className="section_head">
                        <h3 className="heading" style={{fontWeight: "700", fontFamily: "Montserrat"}}>Brands</h3>
                    </div>
                    <BrandSlider />
                </div>
            </section>
            <div className="separator"></div>
            <section id="products" className="section">
                <div className="container">
                    {/* <SectionsHead heading="Top Products" /> */}
                    <div className="section_head">
                        <h3 className="heading" style={{fontWeight: "700", fontFamily: "Montserrat"}}>Top Products</h3>
                    </div>
                    <TopProducts products={products} onAddToCart={onAddToCart} />
                </div>
            </section>
            <Services />
        </>
    )
}

export default HomePage