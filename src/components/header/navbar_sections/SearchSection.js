import React, { useState } from 'react';
import './SearchSection.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchSection({ setSearchQuery, handleSearchSubmit, products }) {
    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const location = useLocation();


    // Function to filter suggestions based on the input value
    const getSuggestions = (value) => {
        if (!value) {
            return [];
        }
        // Filter the products to get suggestions based on the product title
        return products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase())
        ).map(product => product.title);
    };

    // Handler for search input change
    const onSearchChange = (e) => {
        const value = e.target.value;
        setLocalSearchQuery(value);
        if (value.length > 1) {
            setSuggestions(getSuggestions(value));
        } else {
            setSuggestions([]);
        }
    };

    // Handler for search submission
    const onSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localSearchQuery);
        handleSearchSubmit(localSearchQuery);
        setSuggestions([]);
    };

    // Handler for suggestion clicked
    const onSuggestionClicked = (suggestion) => {
        setLocalSearchQuery(suggestion);
        setSearchQuery(suggestion);
        handleSearchSubmit(suggestion);
        setSuggestions([]);
    };



    return (
        <div className="search-panel">
            <form onSubmit={onSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search our store"
                    value={localSearchQuery}
                    onChange={onSearchChange}
                    className="search-input"
                    autoComplete="off" // Disable browser autocomplete
                />
                <button type="submit" className="btn search-submit">Search</button>
            </form>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => onSuggestionClicked(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchSection;
