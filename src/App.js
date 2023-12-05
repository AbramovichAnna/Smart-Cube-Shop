import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/header/Navbar";
import AllProducts from "./Pages/AllProducts";
import NotFoundPage from "./Pages/NotFoundPage";
import Footer from "./components/footer/Footer";
import './App.css';
import GiftCards from "./components/giftcards/Giftcards";
import Login from "./components/Login";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);

  const HOST_URL = "https://shop-api-763v.onrender.com";
  // HOST_URL = "http://localhost:8000"

  //---------------------------------------------------------------------------- GET PRODUCTS
  function getProducts() {
    axios.get(HOST_URL + "/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  //---------------------------------------------------------------------------- GET PRODUCTS BY CATEGORY 
  function getProductsByCategory(categoryId) {
    axios.get(HOST_URL + "/products?categoryId=" + categoryId)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  //---------------------------------------------------------------------------- GET PRODUCTS BY SEARCH
  function getProductsBySearch(searchText) {
    axios.get(HOST_URL + "/products?title=" + searchText)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  //---------------------------------------------------------------------------- GET CATEGORIES
  function getCategories() {
    axios.get(HOST_URL + "/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  //---------------------------------------------------------------------------- GET CART ITEMS
  function getCartItems() {
    axios.get(HOST_URL + "/cart")
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  //---------------------------------------------------------------------------- ADD TO CART
  function addToCart(productId) {
    axios.post(HOST_URL + "/cart", { productId })
      .then(response => {
        setCartItems([...cartItems, response.data]);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  //---------------------------------------------------------------------------- REMOVE FROM CART
  function removeFromCart(productId) {
    axios.delete(HOST_URL + "/cart/" + productId)
      .then(response => {
        setCartItems(cartItems.filter(item => item.product.id !== productId));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  //---------------------------------------------------------------------------- HANDLE SEARCH
  function handleSearch(searchText) {
    setSearch(searchText);
    axios.get(HOST_URL + "/products?title=" + searchText)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  
    //---------------------------------------------------------------------------- USE EFFECT
    useEffect(getProducts, []);
    useEffect(getCategories, []);
    useEffect(getCartItems, []);


    return (
      <BrowserRouter>
        <Navbar cartItems={cartItems} handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProducts products={products} addToCart={addToCart} categories={categories} />} />
          <Route path="/product/:productId" element={<ProductDetails product={product} />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }

  export default App;
