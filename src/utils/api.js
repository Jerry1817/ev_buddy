import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create();

// Request interceptor - add auth token based on current role
api.interceptors.request.use(
  (config) => {
    // If Authorization is already set (eg: manually in the request), don't overwrite it
    if (config.headers.Authorization) {
      return config;
    }

    // Get current role to determine which token to use
    const role = localStorage.getItem('role');
    
    let token = null;
    
    // Select token based on current role
    if (role === 'ADMIN') {
      token = localStorage.getItem('adminToken');
    } else if (role === 'HOST') {
      token = localStorage.getItem('hosttoken');
    } else if (role === 'DRIVER') {
      token = localStorage.getItem('userToken');
    } else {
      // Fallback: check all tokens if role not set
      token = localStorage.getItem('adminToken') || 
              localStorage.getItem('userToken') || 
              localStorage.getItem('hosttoken');
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle blocked users
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if user is blocked
    if (error.response?.status === 403 && error.response?.data?.blocked) {
      // Clear all tokens
      localStorage.removeItem('userToken');
      localStorage.removeItem('hosttoken');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      
      // Show blocked message
      toast.error(error.response.data.message || 'Your account has been blocked by admin', {
        duration: 5000,
        icon: '🚫',
      });
      
      // Redirect to login page
      window.location.href = '/Login';
      
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default api;
