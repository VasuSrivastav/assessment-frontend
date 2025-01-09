import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/zustand.js';

const Home = () => {
  const navigate = useNavigate();
  const { userRole } = useStore();
  const [status, setStatus] = useState("user");


  useEffect(() => {
    const roleStatus = localStorage.getItem('roleStatus');
    if (roleStatus) {
      setStatus(roleStatus);
    }
  }, []);

  return (
    <div className='bg-pattern flex justify-center items-center h-[87vh] z-0 w-full'>
      {status === 'admin' && (
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Dashboard
        </button>
      )}
      <button
        onClick={() => navigate('/posts')}
        className="bg-emerald-800 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Post
      </button>
    </div>
  );
};

export default Home;