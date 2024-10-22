"use client"
import React, { useState, useEffect } from "react";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("Cart item")) || [];
        setCart(storedCart);
    }, []);

    const handleAddToCart = (product) => {
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            
            updatedCart[existingItemIndex].count += 1;
        } else {
            
            updatedCart.push({ ...product, count: 1 });
        }

        setCart(updatedCart);
        localStorage.setItem("Cart item", JSON.stringify(updatedCart));
    };

    const handleDecrement = (product) => {
        const updatedCart = cart.map(item =>
            item.id === product && item.count > 1 ? { ...item, count: item.count - 1 } : item
        );

        setCart(updatedCart);
        localStorage.setItem("Cart item", JSON.stringify(updatedCart));
    };

    return (
        <div className="cart-container">
            <h2>Cart Items</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <img src={item.image} alt={item.title} style={{ maxWidth: '100px' }} />
                        <div>
                            <button type="button" onClick={() => handleDecrement(item.id)}>-</button>
                            <span>{item.count}</span>
                            <button type="button" onClick={() => handleAddToCart(item)}>+</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
