import React, { useState } from 'react';
import { searchProducts } from './shopifysb'; // Assuming shopify.js is in the same directory as SearchBar.js

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const products = await searchProducts(searchTerm);
        console.log(products); // Replace this with what you actually want to do with the products
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
