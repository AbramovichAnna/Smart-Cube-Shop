import React from 'react'
import Services from '../components/Services'

function HomePage() {
    console.log("HomePage");
    return (
        <>
            <section id="hero">
                {/* <HeroSlider /> */}
            </section>

            <section id="featured" className="section">
                <div className="container">
                    {/* <SectionsHead heading="Featured Products" /> */}
                    <div className="section_head">
                        <h2 className="heading">"Featured Products"</h2>
                    </div>
                    {/* <FeaturedSlider /> */}
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