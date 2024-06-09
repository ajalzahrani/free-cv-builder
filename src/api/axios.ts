import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api';

export default axios.create({
  baseURL: BASE_URL,
});

// use this axios instance to call API privatlly for JWT
// Interceptors
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
