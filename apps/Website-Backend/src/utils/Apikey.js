import dotenv from 'dotenv';
dotenv.config(); // Initialize dotenv
const API_URL_BACKEND = 
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_URL_BACKEND_PRODUCTION
        : process.env.REACT_APP_API_URL_BACKEND_DEVELOPMENT;

export default API_URL_BACKEND;