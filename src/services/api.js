import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:5000/api';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable sending cookies with requests
});

// Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      // if (window.location.pathname !== '/login') {
      //   window.location.href = '/login';
      // }
    }
    return Promise.reject(error);
  }
);

// API Handlers

// Authenticated Image Upload
export const uploadImageAuth = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/scan/images/upload/auth', formData, {
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
  const response = await api.post('/scan/images/upload/guest', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Fetch User Scans
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

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error in GET /users/profile:', error);
    throw error;
  }
};

// Update User Profile 
export const updateProfile = async (data) => {
  try {
    const response = await api.put('/auth/me', data);
    return response.data;
  } catch (error) {
    console.error('Error in PATCH /users/profile:', error);
    throw error;
  }
};

// Login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in POST /auth/login:', error);
    throw error;
  }
};

// Signup
export const signup = async (credentials) => {
  try {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in POST /auth/signup:', error);
    throw error;
  }
};

// Social Login
export const socialLogin = async (credentials) => {
  try {
    const response = await api.post('/auth/social-login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in POST /auth/social:', error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error in POST /auth/logout:', error);
    throw error;
  }
};