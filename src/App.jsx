import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import "./App.css";
import Layout from "./Layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScanPage from "./pages/Scan";
import ProfilePage from "./pages/ProfilePage";
import { fetchUserProfile } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
import ScanHistory from "./pages/ScanHistory";
import ScanDetailsPage from "./pages/ScanDetail";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />

        <Route
          path="/scan"
          element={
            <Layout>
              <ScanPage />
            </Layout>
          }
        />
        <Route
          path="/scan-history"
          element={
            <Layout>
              <ScanHistory />
            </Layout>
          }
        />
        <Route
          path="/scan/:scanId"
          element={
            <Layout>
              <ScanDetailsPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
