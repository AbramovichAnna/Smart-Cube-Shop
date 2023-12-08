import axios from "axios";

export const HOST_URL = "https://shop-api-763v.onrender.com";

export const getProducts = (categoryId = "") => {
    return axios.get(`${HOST_URL}/products${categoryId ? `?categoryId=${categoryId}` : ''}`);
};

export const getCategories = () => {
    return axios.get(`${HOST_URL}/categories`);
};

export const getCartItems = () => {
    return axios.get(`${HOST_URL}/cart`);
};

export const removeFromCart = (productId) => {
    return axios.delete(`${HOST_URL}/cart/${productId}`);
};

export const addToCart = (productId) => {
    return axios.post(`${HOST_URL}/cart_item/${productId}`);
};
