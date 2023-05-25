import React, { useState } from 'react';
import { searchProducts } from './shopifysb'; 

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const products = await searchProducts(searchTerm);
        console.log(products); // Log the products to the console
        setResults(products); // Store the results in state
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map(product =>
                    <li key={product.id}>
                        <img src={product.images.edges[0]?.node.originalSrc} alt={product.title} />
                        {product.title}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default SearchBar;