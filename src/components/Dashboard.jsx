import React, { useEffect } from 'react';
import { useStore } from '../store/zustand.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { fetchUsers, users, isFetchingUsers, updateUserRole, isUpdatingUserRole, fetchUserInfo, selectedUser } = useStore();
    const navigate = useNavigate();
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleRoleChange = (userId, role) => {
        updateUserRole(userId, role);
    };

    const handleUserClick = (userId) => {
        fetchUserInfo(userId);
    };

    return (
        <div className="flex flex-col p-8">
            <div>
                <button
        onClick={() => navigate('/')}
        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Go to Home
                    </button>
            </div>
            <div className="flex">
        
                <div className="w-1/3">
                <h2 className="text-2xl font-bold mb-6">Users</h2>
                {isFetchingUsers ? (
                    <p>Loading users...</p>
                ) : (
                    <ul>
                        {users.map(user => (
                            <li key={user._id} className="mb-4">
                                <button
                                    onClick={() => handleUserClick(user._id)}
                                    className="w-full text-left p-2 border border-gray-300 rounded"
                                >
                                    {user.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-2/3 pl-8">
                {selectedUser ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">User Info</h2>
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <p><strong>Post Count:</strong> {selectedUser.postCount}</p>
                        <div className="mt-4">
                            <label className="block text-gray-700">Change Role:</label>
                            <select
                                value={selectedUser.role}
                                onChange={(e) => handleRoleChange(selectedUser._id, e.target.value)}
                                disabled={isUpdatingUserRole}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <p>Select a user to see their info</p>
                )}
            </div>
      </div>
        </div>
    );
};

export default Dashboard;