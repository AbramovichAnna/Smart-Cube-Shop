import axios from 'axios';
import { HOST_URL } from './shopApi';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${HOST_URL}/register/`, userData);
        return response.data; 
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};