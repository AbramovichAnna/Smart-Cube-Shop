import React, { useState } from 'react';
import './AccountSection.css'; 

function SearchSection({ setSearchQuery, handleSearchSubmit }) {

    const [localSearchQuery, setLocalSearchQuery] = useState("");

    const onSearchChange = (e) => {
        setLocalSearchQuery(e.target.value);
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localSearchQuery);
        handleSearchSubmit();
    };

    return (
        <div className="login-panel search-panel"> {/* Reuse the login-panel class */}
            <form onSubmit={onSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for products"
                    value={localSearchQuery}
                    onChange={onSearchChange}
                    className="search-panel input" 
                />
                <button type="submit" className="btn btn-submit">Search</button>
            </form>
        </div>
    );
}

export default SearchSection;
