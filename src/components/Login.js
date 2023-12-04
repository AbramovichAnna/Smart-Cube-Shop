import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const HOST_URL = "http://localhost:8000";

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

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
            // Replace with your server's login endpoint
            const response = await axios.post(HOST_URL + "/token/", credentials);

            // Handle the response from the server here, e.g., check for authentication success
            console.log(response.data);

            // You can redirect the user or perform other actions upon successful login

            // Save credentials to local storage
            localStorage.setItem('username', credentials.username);
            localStorage.setItem('password', credentials.password);

            // Set the token state
            setToken(response.data.access_token);
        } catch (error) {
            // Handle errors here, e.g., display an error message
            console.error(error);
        }
    };
    return (
        <div>
            <h2>Login</h2>
            {localStorage.getItem(token) ? (
                <p>
                    You are logged in as {localStorage.getItem('username')}.{' '}
                    <button onClick={() => localStorage.clear()}>Logout</button>
                </p>
            ) : (
                <p>You are not logged in.</p>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                /><br /><br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
