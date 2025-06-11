import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:5000/api';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the JWT token in the Authorization header
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      // Token expired or invalid, clear local storage and redirect to login
    //   localStorage.removeItem('token');
    if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Handlers

// Authenticated Image Upload
export const uploadImageAuth = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/images/upload/auth', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Guest Image Upload
export const uploadImageGuest = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/images/upload/guest', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Fetch User Scans (to be implemented on the backend)
export const getScans = async () => {
  try {
    const response = await api.get('/scans');
    return response.data;
  } catch (error) {
    console.error('Error in GET /scans:', error);
    throw error;
  }
};

// Delete a Scan
export const deleteScan = async (scanId) => {
  try {
    const response = await api.delete(`/scans/${scanId}`);
    return response.data;
  } catch (error) {
    console.error(`Error in DELETE /scans/${scanId}:`, error);
    throw error;
  }
};

// Get User Profile (assumed endpoint: /api/users/profile)
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error in GET /users/profile:', error);
    throw error;
  }
};

// Login (assumed endpoint: /api/auth/login)
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in POST /auth/login:', error);
    throw error;
  }
}
export const signup = async (credentials) => {
  try {
    const response = await api.post('/auth/signup', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in POST /auth/login:', error);
    throw error;
  }
}