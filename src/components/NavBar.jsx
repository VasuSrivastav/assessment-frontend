import React from 'react';
import { useStore } from '../store/zustand.js';

const NavBar = () => {
  const { authUser, signOut } = useStore();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white z-10">
      <div>Assessment Task</div>
      <div>
        {authUser && (
          <button
            onClick={signOut}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;