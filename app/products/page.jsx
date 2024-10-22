"use client";

import React, { useState, useEffect } from 'react';
import '../products/products.css';
import { useRouter } from 'next/navigation';

const Posts = () => {
const [posts, setPosts] = useState([]);
const [cart, setCart] = useState([]);
const router = useRouter();

useEffect(() => {
const fetchData = async () => {
try {
const response = await fetch("https://fakestoreapi.com/products");
if (!response.ok) {
throw new Error("No response");
}
const data = await response.json();
setPosts(data);
} catch (error) {
console.error('Error in fetching data', error);
}
};
fetchData();


const storedCart = JSON.parse(localStorage.getItem('Cart item')) || [];
setCart(storedCart);
}, []);

const handleDelete = (postId) => {
const updatedPosts = posts.filter(post => post.id !== postId);
setPosts(updatedPosts);
};

const handleCart = (product) => {
const existingCart = [...cart];
const existingProductIndex = existingCart.findIndex(item => item.id === product.id);

if (existingProductIndex !== -1) {
  existingCart[existingProductIndex].count += 1;
} else {
  existingCart.push({ ...product, count: 1 });
}

setCart(existingCart);
localStorage.setItem('Cart item', JSON.stringify(existingCart));
console.log("Cart updated:", existingCart);
router.push('/cart')
};

return (
<div className="posts-container">
<h2>Categories</h2>
<h2>Products</h2>
<ul className="product-list">
{posts.map(post => (
<li key={post.id} className="product">
<div>
<h3>{post.title}</h3>
<img src={post.image} alt={post.title} style={{ maxWidth: '100px' }} />
{post.rating && (
<p>Rating: <span>rate: {post.rating.rate}</span> <span>count: {post.rating.count}</span> </p>
)}
<button type='button' onClick={() => handleDelete(post.id)}>Delete</button>
<button type='button' onClick={() => handleCart(post)}>Add to Cart</button>
</div>
</li>
))}
</ul>
</div>
);
};

export default Posts;