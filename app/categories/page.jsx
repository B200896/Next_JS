"use client"
import React, { useState, useEffect } from 'react';

function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
                .then(response => response.json())
                .then(data => setProducts(data));
        }
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
   
    return (
        <div className="category-page">
            <h2>Product Categories List</h2>
            <ul className="category-list">
                {categories.map((category, index) => (
                    <li key={index}>
                        <button onClick={() => handleCategoryClick(category)}>{category}</button>
                    </li>
                ))}
            </ul>

            {selectedCategory && (
                <div className="selected-category-products">
                    <h3>Products in Category: {selectedCategory}</h3>
                    <ul className="product-list">
                        {products.map(product => (
                            <li key={product.id} className="product">
                                <div>
                                    <h4>{product.title}</h4>
                                    <img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} />
                                    <p>{product.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
