import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./store/zustand.js";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Posts from "./components/Posts.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const { authUser, initializeAuth, isCheckingAuth } = useStore();

  useEffect(() => {
    const loadGoogleScript = () => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.onload = () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                });
            });
        };
        document.body.appendChild(script);
    };

    loadGoogleScript();
    initializeAuth();
  }, [initializeAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        loader .....
      </div>
    );

  return (
    <>
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
    </>
  );
}

export default App;
