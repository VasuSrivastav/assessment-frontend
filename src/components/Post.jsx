import React from 'react';

const Post = ({ title, bio, description, onUpdate, onDelete }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{bio}</p>
      <p>{description}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;