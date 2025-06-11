import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import './App.css'
import Layout from './Layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout > <HomePage /> </Layout>} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />

        
      </Routes>
    </BrowserRouter>
  );
};

export default App;