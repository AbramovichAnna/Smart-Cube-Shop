import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/header/Navbar";
import AllProducts from "./components/product/AllProducts.js";
import NotFoundPage from "./Pages/NotFoundPage";
import Footer from "./components/footer/Footer";
import Loader from "./components/loader/Loader";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import './App.css';
import { HOST_URL } from './common/constants.js';
import ScrollToTop from './common/ScrollToTop.js';
import Payment from './components/cart/Payment.js';


function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [minimumLoadingTimeMet, setMinimumLoadingTimeMet] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // FETCH ALL DATA
    const fetchAllData = async () => {
      try {
        const [productsResponse, categoriesResponse, cartItemsResponse] = await Promise.all([
          axios.get(`${HOST_URL}/products`),
          axios.get(`${HOST_URL}/categories`),
          axios.get(`${HOST_URL}/cart_items`),
        ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        // Ensure cartItems is an array
        setCartItems(Array.isArray(cartItemsResponse.data) ? cartItemsResponse.data : []);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
    const timer = setTimeout(() => {
      setMinimumLoadingTimeMet(true);
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // console.log('products', products);
  // console.log('categories', categories);
  // console.log('cartItems', cartItems);

  if (isLoading || !minimumLoadingTimeMet) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  // ADD TO CART
  const handleAddToCart = async (productId) => {
    const cartId = getCurrentCartId();

    try {
      // Check if already have an existing item
      const existingItem = cartItems.find(item => item.product.id === productId);

      if (existingItem) {
        // Increase the quantity of the existing item
        const updatedQuantity = existingItem.quantity + 1;
        const response = await axios.put(`${HOST_URL}/update_cart_items/${existingItem.id}`, {
          quantity: updatedQuantity
        });
        // Update the cart items with the new quantity
        setCartItems(response.data);
      } else {
        // Add a new item to the cart
        const addingProduct = {
          product_id: productId,
          quantity: 1,
          cart_id: cartId
        };
        const response = await axios.post(`${HOST_URL}/cart_items/`, addingProduct);
        setCartItems([...cartItems, response.data]);
      }
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
  };

  const getCurrentCartId = () => {
    return localStorage.getItem('cartId') || null;
  };

  // UPDATE CART
  const handleIncrease = async (item) => {
    if (item.quantity < item.product.inStock) {
      try {
        const response = await axios.put(`${HOST_URL}/update_cart_items/${item.id}`, { quantity: item.quantity + 1 });
        setCartItems(response.data);
        console.log('put response.data', response.data);

      }
      catch (error) {
        console.error('Error increasing item', error);
      }
    }
  };
  // DECREASE CART
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await axios.put(`${HOST_URL}/update_cart_items/${item.id}`, { quantity: item.quantity - 1 });
        setCartItems(response.data);
      }
      catch (error) {
        console.error('Error decreasing item', error);
      }
    } else {
      handleRemove(item);
    }
  };
  // REMOVE FROM CART
  const handleRemove = async (item) => {
    try {
      await axios.delete(`${HOST_URL}/update_cart_items/${item.id}`);
      setCartItems(currentItems => currentItems.filter(cartItem => cartItem.id !== item.id));
    } catch (error) {
      console.error('Error removing item', error);
    }
  };

  // CLEAR ALL ITEMS FROM CART
  const handleRemoveAll = async () => {
    try {
      const response = await axios.delete(`${HOST_URL}/clear_cart`);
      if (response.status === 204) {
        setCartItems([]);         // Clear the cart items
      }
    } catch (error) {
      console.error('Error clearing cart', error);
    }
  };

  // --------------------------------------------------- RENDER ----------------------------------------------
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar
        cartItems={cartItems}
        products={products}
      />
      <Routes>
        <Route path="/Smart-Cube-Shop" element={
          <HomePage
            products={products}
            onAddToCart={handleAddToCart}
          />}
        />

        <Route path="/all-products" element={
          <AllProducts
            products={products}
            categories={categories}
            onAddToCart={handleAddToCart} />}
        />

        <Route path="/product/:productId" element={
          <ProductDetails
            onAddToCart={handleAddToCart}
            products={products} />}
        />

        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
          />} />

        <Route path="/checkout" element={
          <Payment
            cartItems={cartItems}
          />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;