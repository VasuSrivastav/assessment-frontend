import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-pattern flex justify-center items-center h-[87vh] z-0 w-full'>
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