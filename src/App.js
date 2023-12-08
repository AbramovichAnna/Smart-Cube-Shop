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
import { HOST_URL } from './common/constants.js';

function App() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [productsResponse, categoriesResponse, cartItemsResponse] = await Promise.all([
          axios.get(`${HOST_URL}/products`),
          axios.get(`${HOST_URL}/categories`),
          axios.get(`${HOST_URL}/cart_items`)
        ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setCartItems(cartItemsResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Check for loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const handleAddToCart = async (productId) => {
    try {
      const addingProduct = { 
        product_id: productId, 
        quantity: 1, 
      };
        // console.log("add product :", addingProduct);
      const response = await axios.post(`${HOST_URL}/cart_items/`, addingProduct);
      setCartItems(response.data);
      console.log('Item added to cart', response.data);
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
  };
  
    


  // --------------------------------------------------- RENDER ----------------------------------------------
  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/Smart-Cube-Shop" element={<HomePage products={products}/>} />
        <Route path="/all-products" element={<AllProducts products={products} categories={categories} onAddToCart={handleAddToCart} />} />
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
