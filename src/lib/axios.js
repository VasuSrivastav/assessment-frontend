import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://user-api-backend-vqb2.onrender.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});