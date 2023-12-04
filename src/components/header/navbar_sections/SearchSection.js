import React, { useState } from 'react';

function SearchSection({ items }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        // Perform the search logic here (e.g., filter products based on search query)
        const filteredProducts = items.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(filteredProducts);
    };
    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for products"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button type="submit">Search</button>
            </form>

            <h2>Search Results:</h2>
            <ul>
                {searchResults.map((product) => (
                    <li key={product.id}>
                        <strong>{product.name}</strong>: {product.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchSection;
