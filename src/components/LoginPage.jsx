import React, { useState } from 'react';
import { useStore } from '../store/zustand.js';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const { signIn, isLoggingIn, googleSignIn } = useStore();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (data) => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid";
    if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters long";
    return newErrors;
  };

  const handleSignInFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      signIn(data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSignInFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input type="email" name="email" className="w-full p-2 border border-gray-300 rounded mt-1" required />
            {errors.email && <small className="text-red-500">{errors.email}</small>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input type="password" name="password" className="w-full p-2 border border-gray-300 rounded mt-1" required />
            {errors.password && <small className="text-red-500">{errors.password}</small>}
          </div>
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-4" disabled={isLoggingIn}>
            Sign In
          </button>
        </form>
        <GoogleLogin
          onSuccess={credentialResponse => {
            googleSignIn(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <button
          onClick={() => navigate('/signup')}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;