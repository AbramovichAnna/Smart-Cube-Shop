import React from 'react';
import { Link } from 'react-router-dom';
import "./AccountSection.css";
import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { HOST_URL } from '../../../common/constants';


function AccountSection() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [registerCredentials, setRegisterCredentials] = useState({
        username: '',
        email: '',
        password: '',
    });
    const isLoggedIn = !!token;

    // LOGIN
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(HOST_URL + "/token/", credentials);
            // console.log(response.data);
            const token = response.data.access;
            // Save the token to Axios defaults
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Save the token to local storage
            localStorage.setItem('token', token);
            let decoded = jwtDecode(token);
            // Save the username to local storage
            localStorage.setItem('username', credentials.username);
            const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
            console.log('Login successful', response.data);
            toggleForms();
            alert('Login succesful');
            // console.log("user", credentials.username, "logged in");
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    // LOGOUT
    const handleLogout = () => {
        localStorage.clear();
        setCredentials({
            username: '',
            password: '',
        });
        console.log('Logout successful');
    };


    // REGISTRATION
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterCredentials({
            ...registerCredentials,
            [name]: value,
        });
        // console.log(registerCredentials);
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${HOST_URL}/register/`, registerCredentials);
            console.log('Registration successful', response.data);
            alert('Registration successful');
            setShowLoginForm(true);
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        }
    };

    // TOGGLE FORMS
    const toggleForms = () => {
        setShowLoginForm(!showLoginForm);
    };

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${HOST_URL}/cart_items/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (error) {
            console.error('Error fetching cart', error);
        }
    };

    if (localStorage.getItem('token')) {
        fetchCart();
    }

    return (
        <div className="navbar-right-section" id="account">
            <div className="inner">
                {isLoggedIn ? (
                    // ACCOUNT PANEL COMPONENT
                    <div className="account-panel">
                        <h5 style={{ color: "#161a1e", fontWeight: "600" }}>Welcome back</h5> <h5 style={{ color: "#b90000", fontWeight: "700" }}>{username}</h5>
                        <ul>
                            <div className="separator"></div>
                            <li><Link to="/my-account">
                                <p style={{ color: "#161a1e" }}>My Profile</p></Link></li>
                            <li><Link to="/cart">
                                <p style={{ color: "#161a1e" }}>My Cart</p></Link></li>
                            <li><Link to="/my-account">
                                <p style={{ color: "#161a1e" }}>My Orders</p></Link></li>
                            <li><Link to="/my-account">
                                <p style={{ color: "#161a1e" }}>Wishlist</p></Link></li>
                            <div className="separator"></div>
                            <button className="btn btn-submit" onClick={handleLogout}>Logout</button>
                        </ul>
                    </div>
                ) : showLoginForm ? (

                    // LOGIN FORM COMPONENT
                    <div className="login-panel">
                        <h3 style={{ color: "#161a1e" }}>CUSTOMER LOGIN</h3>
                        <form onSubmit={handleSubmit} method="POST">
                            <input type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                                placeholder="Username" />
                            <input input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                placeholder="Password" />
                            <Link to="#" id="forget-pass">Forgot your password?</Link>
                            <div className="checkbox">
                                <label className="check">
                                    <input id="" type="checkbox" value="" />
                                    <div className="box"></div>
                                </label>
                                <span>Remember Me</span>
                                <button className="btn btn-submit" type="submit" >Login</button>
                            </div>
                        </form>
                        <p>Don’t have an account? <a href="#" style={{ textDecoration: "underline" }} onClick={(e) => { e.preventDefault(); toggleForms(); }}>Signup</a></p>
                    </div>
                ) : (

                    //REGISTRATION FORM COMPONENT
                    <div className="registration-panel login-panel">
                        <h3 style={{ color: "#161a1e" }}>CUSTOMER REGISTER</h3>
                        <form onSubmit={handleRegisterSubmit} method="POST">
                            <input
                                type="text"
                                name="username"
                                value={registerCredentials.username}
                                onChange={handleRegisterChange}
                                required
                                placeholder="Username"
                            />
                            <input type="email"
                                id="reg-email"
                                name="email"
                                value={registerCredentials.email}
                                onChange={handleRegisterChange}
                                required
                                placeholder="Email" />
                            <input type="password"
                                id="reg-password"
                                name="password"
                                value={registerCredentials.password}
                                onChange={handleRegisterChange}
                                required
                                placeholder="Password" />

                            <button className="btn btn-submit" type="submit">Register</button>
                        </form>
                        <p>Already have an account? <a href='#' style={{ textDecoration: "underline" }} onClick={(e) => { e.preventDefault(); toggleForms(); }}>Login</a></p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AccountSection;