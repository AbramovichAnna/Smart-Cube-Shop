import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { BsBasket } from 'react-icons/bs';
import { TfiClose, TfiGift, TfiSearch, TfiUser, TfiHome } from 'react-icons/tfi';
import { BsShop } from "react-icons/bs";
import AccountSection from './navbar_sections/AccountSection';
import CartSection from './navbar_sections/CartSection';
import SearchSection from './navbar_sections/SearchSection';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Navbar.css';


// navbar sections
const NAVBAR_ITEMS = [
    { name: "home", icon: TfiHome },
    { name: "shop", icon: BsShop },
    { name: "giftcards", icon: TfiGift },
    { name: "search", icon: TfiSearch, closeIcon: TfiClose },
    { name: "cart", icon: BsBasket, closeIcon: TfiClose },
    { name: "account", icon: TfiUser, closeIcon: TfiClose },
];

function Navbar({ cartItems, onIncrease, onDecrease, onRemove }) {

    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // HANDLE SEARCH SUBMIT
    const handleSearchSubmit = () => {
        navigate('/all-products', { state: { searchQuery } });
    };

    useEffect(() => {
        setSearchQuery('');
    }, []);

    // TOGGLE NAVBAR SECTIONS
    const handleToggle = (section) => {
        if (section === "giftcards") {
            navigate('/gift-cards');
            return;
        } else if (section === "shop") {
            navigate('/all-products');
            return;
        }
        else if (section === "home") {
            navigate('/Smart-Cube-Shop');
            return;
        }
        setActiveSection((prevSection) => (prevSection === section ? "" : section));
    };

    // STICKY NAVBAR
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
        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="navbar">
            <Link to="/Smart-Cube-Shop" className="navbar-left">
                <div className="navbar-logo">
                    <img src="/images/logo_2.png" alt="logo-2" />
                </div>
                <div className="logo-text">
                    <h3>Smart Cube</h3>
                </div>
            </Link>

            <div className="navbar-right">
                <div className="inner">
                    {NAVBAR_ITEMS.map((item) => (
                        <div
                            key={item.name}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleToggle(item.name)}
                            className={`navbar-right-toggle ${activeSection === item.name ? "active" : ""}`}
                        >
                            <>
                                {activeSection === item.name ? <item.closeIcon /> : <item.icon />}
                                <h6 className="icon-text">{item.name}</h6>
                            </>

                        </div>
                    ))}
                </div>
                <div className={`navbar-right-dropdown ${activeSection ? "active" : ""}`}>
                    {activeSection === "account" && 
                    <AccountSection 
                    setActiveSection={setActiveSection} 
                    />}
                    {activeSection === "cart" &&
                        <CartSection
                            cartItems={cartItems}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                            onRemove={onRemove}
                        />}
                    {activeSection === "search" &&
                        <SearchSection
                            setSearchQuery={setSearchQuery}
                            handleSearchSubmit={handleSearchSubmit}
                        />}
                </div>

            </div>
        </div>
    );
}

export default Navbar;
