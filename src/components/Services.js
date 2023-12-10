import React from 'react'
import { FaTruckFast, FaShieldHalved, FaTags, FaCreditCard } from "react-icons/fa6";
import './Services.css';


const SERVISE_ITEMS = [
    { title: "Free Delivery", icon: FaTruckFast, info: "Free shipping on all order" },
    { title: "Brand Warranty", icon: FaShieldHalved, info: "100% Original products" },
    { title: "Great Deals", icon: FaTags, info: "Amazing discounts on all products" },
    { title: "Secure Payments", icon: FaCreditCard, info: "We provide 100% secure payment" },
];
function Servises() {
    return (
        <>
            <section id="services" className="section">
                <div className="container">
                    <div className="section_head">
                        <h3 className="heading">Our Advantages</h3>
                    </div>
                    <div className="wrapper services_wrapper">
                        {SERVISE_ITEMS.map((item, i) => (
                            <div key={i} className="services_item">
                                <div className="services_icon">
                                    <item.icon />
                                </div>
                                <div className="services_info">
                                    <div className="services_details"></div>
                                    <h5 className="services_name">{item.title}</h5>
                                    <p className="services_desc">{item.info}</p>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </section >
        </>
    )
}

export default Servises