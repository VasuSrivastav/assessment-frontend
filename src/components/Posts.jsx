import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/zustand.js';
import { useNavigate } from 'react-router-dom';
import Post from './Post';

const Posts = () => {
  const { authUser, fetchPosts, createPost, updatePost, deletePost, posts, isFetchingPosts, isCreatingPost } = useStore();
  const [newPost, setNewPost] = useState({ title: '', bio: '', description: '' });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate();
  const titleInputRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const validateForm = (data) => {
    const newErrors = {};
    if (data.title.length < 3) newErrors.title = "Title must be at least 3 characters long";
    if (data.bio.length < 3) newErrors.bio = "Bio must be at least 3 characters long";
    if (data.description.length < 10) newErrors.description = "Description must be at least 10 characters long";
    return newErrors;
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(newPost);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      if (isEditing) {
        updatePost(editingPostId, newPost);
        setIsEditing(false);
        setEditingPostId(null);
      } else {
        createPost(newPost);
      }
      setNewPost({ title: '', bio: '', description: '' });
    }
  };

  const handleUpdatePost = (postId) => {
    const postToEdit = posts.find(post => post._id === postId);
    setNewPost({ title: postToEdit.title, bio: postToEdit.bio, description: postToEdit.description });
    setIsEditing(true);
    setEditingPostId(postId);
    titleInputRef.current.focus();
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  return (
    <div className="p-8">
      
      <button
        onClick={() => navigate('/')}
        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Go to Home
      </button>
      <h2 className="text-2xl font-bold mb-6">Posts</h2>
      <form onSubmit={handleNewPostSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            ref={titleInputRef}
          />
          {errors.title && <small className="text-red-500">{errors.title}</small>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio:</label>
          <input
            type="text"
            value={newPost.bio}
            onChange={(e) => setNewPost({ ...newPost, bio: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {errors.bio && <small className="text-red-500">{errors.bio}</small>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
          {errors.description && <small className="text-red-500">{errors.description}</small>}
        </div>
        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" disabled={isCreatingPost}>
          {isEditing ? 'Update Post' : 'Add Post'}
        </button>
      </form>
      <div>
        {isFetchingPosts ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              bio={post.bio}
              description={post.description}
              onUpdate={() => handleUpdatePost(post._id)}
              onDelete={() => handleDeletePost(post._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;