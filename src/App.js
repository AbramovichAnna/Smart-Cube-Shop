import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
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
import axios from "axios";



function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [brand, setBrand] = useState(null);

  const HOST_URL = "http://localhost:8000";
  // GET PRODUCTS
  function getProducts() {
    axios
      .get(HOST_URL + "/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  // GET CATEGORIES
  function getCategories() {
    axios
      .get(HOST_URL + "/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  // GET CART ITEMS
  function getCartItems() {
    axios
      .get(HOST_URL + "/cart")
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  // ADD TO CART
  function addToCart(productId) {
    axios
      .post(HOST_URL + "/cart", { productId })
      .then((response) => {
        setCartItems([...cartItems, response.data]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  // REMOVE FROM CART
  function removeFromCart(productId) {
    axios
      .delete(HOST_URL + "/cart/" + productId)
      .then((response) => {
        setCartItems(cartItems.filter((item) => item.product.id !== productId));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // SEARCH
  function handleSearch(searchText) {
    setSearch(searchText);
    axios
      .get(HOST_URL + "/products?title=" + searchText)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }


  useEffect(getProducts, []);
  useEffect(getCategories, []);
  useEffect(getCartItems, []);



  return (
    <>
      <BrowserRouter>
        <Navbar cartItems={cartItems} handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-products" element={<AllProducts products={products} brand={products.brand} addToCart={addToCart} categories={categories} />} />
          <Route path="/products/:productId" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;



