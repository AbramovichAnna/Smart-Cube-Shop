import React from 'react';
import "./Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ScrollToTopButton from './ScrollToTopButton';

function Footer() {
    const currentYear = new Date().getFullYear();
    const USEFUL_LINKS = [
        { name: "FAQs", link: "/" },
        { name: "Help & Support", link: "/" },
        { name: "Terms of Service", link: "/" },
        { name: "Cancellation & Refunds", link: "/" }
    ];
    const QUICK_LINKS = [
        { name: "Track Order", link: "/" },
        { name: "Privacy Policy", link: "/" },
        { name: "Shipping Rates", link: "/" },
        { name: "Locate Service Centres", link: "/" }
    ];

    return (
        <footer id="footer" className="footer">
            <div className="wrapper footer-wrapper">
                <div className="container">
                    <Link to="/Smart-Cube-Shop" className="logo-center">
                        <div className="navbar-logo">
                            <img src="public/images/logo_2.png" alt="logo" />
                        </div>
                        <div className="logo-text">
                            <h3>Smart Cube</h3>
                        </div>
                    </Link>
                    <ScrollToTopButton />
                    <div className="footer-content">
                        <div className="useful-links">
                            <h5>Useful Links</h5>
                            <ul className="p-0 mt-4">
                                {USEFUL_LINKS.map((item, index) => (
                                    <li key={index}><Link to={item.link}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="social-links">
                            <div className="foot_social_links social_links">
                                <Link to="https://www.linkedin.com/in/anna--abramovich/"><FaLinkedin className="footer-icon" /></Link>
                                <Link to="https://github.com/AbramovichAnna?tab=repositories"><FaGithub className="footer-icon" /></Link>
                            </div>
                            <div className="foot_vr_line"></div>

                            <div className="subscribe-form">
                                <h6>Connect with me</h6>
                                <form>
                                    <input type="email" className="subs_field" placeholder="Your Email*" required="" /> <br />
                                    <button type="submit" className="btn subscribe-btn">Subscribe</button>
                                </form>
                            </div>
                        </div>

                        <div className="quick-links">
                            <h5>Quick Links</h5>
                            <ul className="p-0 mt-4">
                                {QUICK_LINKS.map((item, index) => (
                                    <li key={index}><Link to={item.link}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="foot_credit">
                    <p>
                        © {currentYear} SmartCube Shop. All Rights Reserved.
                        <span>Designed &amp; Built by | <Link to="https://github.com/AbramovichAnna?tab=repositories" target="_blank" rel="noopener noreferrer">Anna Abramovich</Link> </span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
