import React from 'react';
import { Link } from 'react-router-dom';
import "./AccountSection.css";
import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


function AccountSection() {
    // HOST_URL = "http://localhost:8000"
    const HOST_URL = "https://shop-api-763v.onrender.com";
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    console.log(credentials);

    const [token, setToken] = useState('');

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
            console.log(response.data);

            const token = response.data.access;

            // Save the token to Axios defaults
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Save the token to local storage
            localStorage.setItem('token', token);
            let decoded = jwtDecode(token);

            console.log('Login successful', response.data);
            alert('Login succesful');
            navigate('/')
        } catch (error) {
            console.error('Login failed', error.response.data);
        }
    };

    const isLoggedIn = !!localStorage.getItem('token');

    // --------------------------------------------------- LOGOUT
    const handleLogout = () => {
        localStorage.clear();
        setCredentials({
            username: '',
            password: '',
        });
        axios.defaults.headers.common['Authorization'] = '';
    };

    // --------------------------------------------------- REGISTRATION
    const [registerCredentials, setRegisterCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showLoginForm, setShowLoginForm] = useState(true);

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterCredentials({
            ...registerCredentials,
            [name]: value,
        });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
    
        const { username, email, password } = registerCredentials;
        try {
            const response = await axios.post(`${HOST_URL}/register/`, {
                username,
                email,
                password
            });
            console.log('Registration successful', response.data);
            alert('Registration successful');
            toggleForms();
        } catch (error) {
            console.error('Registration failed', error.response?.data);
        }
    };
    

    const toggleForms = () => {
        setShowLoginForm(!showLoginForm);
    };




    return (
        <div className="navbar-right-section" id="account">
            <div className="inner">
                {isLoggedIn ? (
                    <div className="account-panel">
                        <h4 style={{ color: "#161a1e" }}>Hi {credentials.username}, glad to see you!</h4>
                        <ul>
                            <li><Link to="/my-account">My Profile</Link></li>
                            <li><Link to="/my-account">Order History</Link></li>
                            <li><Link to="/my-account">Wishlist</Link></li>
                            <li><Link to="/my-account">Newsletter</Link></li>
                            <li><Link to="/my-account">My Addresses</Link></li>
                            <button> <Link to="/" onClick={handleLogout}>Logout</Link></button>
                        </ul>
                    </div>
                ) : showLoginForm ? (
                    <div className="login-panel">
                        <h4 style={{ color: "#161a1e", fontWeight: "500" }}>CUSTOMER LOGIN</h4>
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
                                <button className="btn btn-submit" type="submit">Login</button>
                            </div>
                        </form>
                        <p>Don’t have an account? <a href="#" style={{ textDecoration: "underline" }} onClick={(e) => { e.preventDefault(); toggleForms(); }}>Signup</a></p>
                    </div>
                ) : (
                    <div className="registration-panel">
                        <h3 style={{ color: "#161a1e" }}>CUSTOMER REGISTER</h3>
                        <form onSubmit={handleRegisterSubmit} method="POST">
                            <input type="text"
                                id="reg-username"
                                name="username"
                                value={registerCredentials.username}
                                onChange={handleRegisterChange}
                                required
                                placeholder="Username" />
                            <input type="password"
                                id="reg-password"
                                name="password"
                                value={registerCredentials.password}
                                onChange={handleRegisterChange}
                                required
                                placeholder="Password" />
                            <input type="password"
                                id="reg-password"
                                name="password"
                                required placeholder="Confirm Password" />
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

