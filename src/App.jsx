import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./store/zustand.js";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Posts from "./components/Posts.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./App.css";

function App() {
  const { authUser, initializeAuth, isCheckingAuth } = useStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        loader .....
      </div>
    );

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/posts" element={authUser ? <Posts /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
      <Toaster />
    </GoogleOAuthProvider>
  );
}

export default App;
