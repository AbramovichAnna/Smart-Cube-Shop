import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import './SearchSection.css';

function SearchSection({ products }) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSearch, setShowSearch] = useState(true);
    const navigate = useNavigate();
    const searchPanelRef = useRef(null);

    const getSuggestions = useCallback((value) => {
        return value.length > 0
            ? products.filter(product =>
                product.title.toLowerCase().includes(value.toLowerCase())
            ).map(product => ({ id: product.id, title: product.title }))
            : [];
    }, [products]);

    const handleInputChange = useCallback(({ target: { value } }) => {
        setInputValue(value);
        setSuggestions(getSuggestions(value));
    }, [getSuggestions]);

    const navigateToProductPageById = useCallback((id) => {
        setInputValue(''); // Clear the input
        setSuggestions([]); // Clear suggestions
        setShowSearch(false); // Hide search
        navigate(`/product/${id}`);
    }, [navigate]);

    const handleSuggestionClick = useCallback((id) => {
        navigateToProductPageById(id);
    }, [navigateToProductPageById]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            navigateToProductPageById(suggestions[0].id);
        }
    }, [suggestions, navigateToProductPageById]);

    const closeSearch = useCallback(() => {
        setInputValue('');
        setSuggestions([]);
        setShowSearch(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) {
                closeSearch();
            }
        };

        if (showSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSearch, closeSearch]);

    if (!showSearch) {
        return null;
    }

    return (
        <div className="search-backdrop">
            <div className="search-panel" ref={searchPanelRef}>
                <form onSubmit={handleSubmit}>
                    <input style={{fontFamily: "montserrat", fontWeight: "500"}}
                        type="text"
                        placeholder="Search for product..."
                        value={inputValue}
                        onChange={handleInputChange}
                        className="search-input"
                        autoComplete="off"
                    />
                    {inputValue && (
                        <IoClose className="search-close-icon" onClick={closeSearch} />
                    )}
                    <button type="submit" className="btn search-submit">Search</button>
                </form>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list" style={{fontFamily: "montserrat", fontWeight: "200"}}>
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.id)}>
                                {suggestion.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SearchSection;
