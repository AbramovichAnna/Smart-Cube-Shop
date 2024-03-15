import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BsBasket } from 'react-icons/bs';
import { TfiSearch, TfiUser, TfiHome, TfiClose } from 'react-icons/tfi';
import { BsShop } from "react-icons/bs";
import AccountSection from './navbar_sections/AccountSection';
import SearchSection from './navbar_sections/SearchSection';
import './Navbar.css';

// Navbar sections
const NAVBAR_ITEMS = [
    { name: "home", icon: TfiHome },
    { name: "shop", icon: BsShop },
    { name: "search", icon: TfiSearch },
    { name: "cart", icon: BsBasket },
    { name: "account", icon: TfiUser, closeIcon: TfiClose },
];

function Navbar({ cartItems, products }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Toggle navbar sections
    const handleToggle = (section) => {
        if (section === "search") {
            setIsSearchActive(prevState => !prevState);
            setActiveSection(""); // Reset active section
            return;
        } else {
            setIsSearchActive(false); // Deactivate search for other sections
        }

        if (section === "shop") {
            navigate('/all-products');
            return;
        } else if (section === "home") {
            navigate('/Smart-Cube-Shop');
            return;
        } else if (section === "cart") {
            navigate('/cart');
            return;
        }

        setActiveSection(prevSection => (prevSection === section ? "" : section));
    };

    // Sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset search active state upon location change
    useEffect(() => {
        setIsSearchActive(false);
    }, [location]);

    return (
        <div className="navbar">
            <Link to="/Smart-Cube-Shop" className="navbar-left">
                <div className="navbar-logo">
                    <img src="Smart-Cube-Shop/images/logo_2.png" alt="shop-logo" />
                </div>
                <div className="logo-text">
                    <h3>Smart Cube</h3>
                </div>
            </Link>

            <div className="navbar-right">
                <div className="inner">
                    {NAVBAR_ITEMS.map((item) => {
                        // Determine if the current item's icon or closeIcon should be shown
                        const Icon = activeSection === item.name && item.closeIcon ? item.closeIcon : item.icon;
                        return (
                            <div
                                key={item.name}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleToggle(item.name)}
                                className={`navbar-right-toggle ${activeSection === item.name ? "active" : ""}`}
                            >
                                <div className="icon-container">
                                    <Icon />
                                    {item.name === "cart" && cartItemsCount > 0 && (
                                        <span className="cart-item-count">{cartItemsCount}</span>
                                    )}
                                </div>
                                <h6 className="icon-text">{item.name}</h6>
                            </div>
                        );
                    })}
                </div>
                {isSearchActive ? (
                    <SearchSection
                        products={products}
                        setIsSearchActive={setIsSearchActive}
                    />
                ) : (
                    <div className={`navbar-right-dropdown ${activeSection ? "active" : ""}`}>
                        {activeSection === "account" &&
                            <AccountSection
                                setActiveSection={setActiveSection}
                            />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
