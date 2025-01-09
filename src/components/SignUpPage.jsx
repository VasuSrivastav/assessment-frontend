import React, { useState } from 'react';
import { useStore } from '../store/zustand.js';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const SignUpPage = () => {
  const { signUp, isSigningUp, googleSignIn } = useStore();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (data) => {
    const newErrors = {};
    if (data.name.length < 3) newErrors.name = "Name must be at least 3 characters long";
    if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid";
    if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters long";
    return newErrors;
  };

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      signUp(data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-400">
      <div className='text-lg text-black mt-6 underline bg-red-400'>Note - <a href='https://user-api-backend-vqb2.onrender.com/' target='_blank' rel='noopener noreferrer'>first check the server is working--takes 50sec -click here-, it turns off after 10 minutes of inactivity </a></div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSignUpFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input type="text" name="name" className="w-full p-2 border border-gray-300 rounded mt-1" required />
            {errors.name && <small className="text-red-500">{errors.name}</small>}
          </div>
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
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-4" disabled={isSigningUp}>
            Sign Up
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
          onClick={() => navigate('/login')}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;