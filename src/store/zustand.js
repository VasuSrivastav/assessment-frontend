import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useStore = create((set, get) => ({
    authUser: null,
    userRole: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    posts: [],
    isFetchingPosts: false,
    isCreatingPost: false,
    isFetchingUsers: false,
    users: [],
    isUpdatingUserRole: false,
    selectedUser: null,

    initializeAuth: async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
        if (token) {
            const jwtToken = token.split('=')[1];
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            try {
                const res = await axiosInstance.get("/auth-user");
                set({ authUser: res.data, userRole: res.data.role });
            } catch (error) {
                console.log("Error in initializeAuth:", error);
                set({ authUser: null, userRole: null });
            }
        } else {
            set({ authUser: null, userRole: null });
        }
        set({ isCheckingAuth: false });
    },

    googleSignIn: async (token) => {
        try {
            const res = await axiosInstance.post("/google-signin", { token });
            toast.success("Logged in successfully");
            document.cookie = `jwtToken=${res.data.token}; path=/`;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            set({ authUser: res.data.user, userRole: res.data.user.role });
        } catch (error) {
            console.log("Error in googleSignIn:", error);
            toast.error("Google sign-in failed");
        }
    },

    signUp: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/register", formData);
            toast.success("User registered successfully");
            document.cookie = `jwtToken=${res.data.token}; path=/`;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            set({ authUser: res.data.user, userRole: res.data.user.role });
        } catch (error) {
            console.log("Error in signUp:", error);
            toast.error("Sign up failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    signIn: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/login", formData);
            toast.success("Logged in successfully");
            document.cookie = `jwtToken=${res.data.token}; path=/`;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            set({ authUser: res.data.user, userRole: res.data.user.role });
        } catch (error) {
            console.log("Error in signIn:", error);
            toast.error("Sign in failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    signOut: async () => {
        try {
            await axiosInstance.get("/logout");
            document.cookie = 'jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            delete axiosInstance.defaults.headers.common['Authorization'];
            set({ authUser: null, userRole: null });
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Error in signOut:", error);
            toast.error("Logout failed");
        }
    },

    fetchPosts: async () => {
        set({ isFetchingPosts: true });
        try {
            const res = await axiosInstance.get("/posts");
            set({ posts: res.data });
        } catch (error) {
            console.log("Error in fetchPosts:", error);
            toast.error("Failed to fetch posts");
        } finally {
            set({ isFetchingPosts: false });
        }
    },

    createPost: async (postData) => {
        set({ isCreatingPost: true });
        try {
            const res = await axiosInstance.post("/posts", postData);
            set({ posts: [...get().posts, res.data] });
            toast.success("Post created successfully");
        } catch (error) {
            console.log("Error in createPost:", error);
            toast.error("Failed to create post");
        } finally {
            set({ isCreatingPost: false });
        }
    },

    updatePost: async (postId, postData) => {
        try {
            const res = await axiosInstance.put(`/posts/${postId}`, postData);
            set({ posts: get().posts.map(post => post._id === postId ? res.data : post) });
            toast.success("Post updated successfully");
        } catch (error) {
            console.log("Error in updatePost:", error);
            toast.error("Failed to update post");
        }
    },

    deletePost: async (postId) => {
        try {
            await axiosInstance.delete(`/posts/${postId}`);
            set({ posts: get().posts.filter(post => post._id !== postId) });
            toast.success("Post deleted successfully");
        } catch (error) {
            console.log("Error in deletePost:", error);
            toast.error("Failed to delete post");
        }
    },

    fetchUsers: async () => {
        set({ isFetchingUsers: true });
        try {
            const res = await axiosInstance.get("/dashboard");
            set({ users: res.data });
        } catch (error) {
            console.log("Error in fetchUsers:", error);
            toast.error("Failed to fetch users");
        } finally {
            set({ isFetchingUsers: false });
        }
    },

    updateUserRole: async (userId, role) => {
        set({ isUpdatingUserRole: true });
        try {
            const res = await axiosInstance.put(`/dashboard/${userId}/role`, { role });
            set({ users: get().users.map(user => user._id === userId ? res.data.user : user) });
            toast.success("User role updated successfully");
        } catch (error) {
            console.log("Error in updateUserRole:", error);
            toast.error("Failed to update user role");
        } finally {
            set({ isUpdatingUserRole: false });
        }
    },

    fetchUserInfo: async (userId) => {
        try {
            const res = await axiosInstance.get(`/dashboard/${userId}`);
            set({ selectedUser: res.data });
        } catch (error) {
            console.log("Error in fetchUserInfo:", error);
            toast.error("Failed to fetch user info");
        }
    },
}));
