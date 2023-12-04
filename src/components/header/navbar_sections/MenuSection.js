import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Menu({ setActiveSection }) {
    console.log("menu section");

    const handleLinkClick = () => {
        setActiveSection(null);
    };
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [categories, setCategories] = useState([]);
    const toggleDropdown = ({ category }) => {
        setDropdownVisibility(!isDropdownVisible);
    };

    useEffect(() => {
        // Fetch categories from API
        axios
            .get("http://localhost:8000/categories")
            .then((response) => {
                setCategories(response.data); // Update state with fetched categories
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <div className="navbar-section" id="menu">
            <div className="inner">
                <div className="menu-items">
                    <ul className="nav-menu">
                        <li>
                            <Link to="/" onClick={handleLinkClick}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop" onClick={handleLinkClick}>
                                Shop
                            </Link>
                        </li>
                        <li className="dropdown" onClick={toggleDropdown}>
                            <Link>Categories</Link>
                            {isDropdownVisible && (
                                <div className="dropdown-content">
                                    {categories.map((category) => (
                                        <Link
                                            to={`/shop/${category.name}`}
                                            key={category.id}
                                            onClick={handleLinkClick}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to="/">About Us</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Menu;
