import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/header/Navbar";
import AllProducts from "./Pages/AllProducts";
import NotFoundPage from "./Pages/NotFoundPage";
import Footer from "./components/footer/Footer";
import GiftCards from "./components/giftcards/Giftcards";
import Login from "./components/Login";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import './App.css';

function App() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  const HOST_URL = "https://shop-api-763v.onrender.com";
  //const HOST_URL = "http://localhost:8000"


  useEffect(() => {
    // Fetch products from server
    axios.get(HOST_URL + "/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));

    // Fetch categories from server
    axios.get(HOST_URL + "/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories', error));

    // Fetch cart items from server
    axios.get(HOST_URL + "/cart_items")
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error fetching cart items', error));
  }
    , []);


  // --------------------------------------------------- RENDER ----------------------------------------------
  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/Smart-Cube-Shop" element={<HomePage />} />
        <Route path="/all-products" element={<AllProducts products={products} categories={categories} />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
