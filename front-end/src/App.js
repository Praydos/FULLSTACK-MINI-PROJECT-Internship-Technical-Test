// src/App.jsx (UPDATED - Complete Fix)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { getAuthToken, logout, getProfile } from './api/api';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Create a context for auth
export const AuthContext = React.createContext();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Check if token exists and is not expired
        const token = localStorage.getItem('token');
        return !!token;
    });
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication status on app load
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token by fetching profile
                    const profile = await getProfile();
                    setUser({
                        email: profile.email,
                        fullName: profile.fullName,
                        userId: profile.id
                    });
                    localStorage.setItem('user', JSON.stringify({
                        email: profile.email,
                        fullName: profile.fullName,
                        userId: profile.id
                    }));
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Token validation failed:', error);
                    // Token is invalid, clear everything
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    // Create AuthProvider value
    const authValue = {
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={authValue}>
            <Router>
                {isAuthenticated ? (
                    <AuthenticatedLayout user={user} onLogout={handleLogout} />
                ) : (
                    <PublicLayout />
                )}

                <main className={isAuthenticated ? "container mx-auto p-4" : ""}>
                    <Routes>
                        <Route path="/login" element={
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <LoginPage />
                            </PublicRoute>
                        } />
                        <Route path="/register" element={
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <RegisterPage />
                            </PublicRoute>
                        } />
                        <Route path="/" element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <ProjectListPage />
                            </PrivateRoute>
                        } />
                        <Route path="/projects/:projectId" element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <ProjectDetailPage />
                            </PrivateRoute>
                        } />
                        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
                    </Routes>
                </main>
            </Router>
        </AuthContext.Provider>
    );
};

// Layout for authenticated users
const AuthenticatedLayout = ({ user, onLogout }) => {
    return (
        <header className="bg-white shadow-md p-4 mb-6">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-200">
                    Project Task Manager
                </Link>
                <div className="flex items-center space-x-4">
                    {user && (
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full">
                                <span className="text-indigo-600 font-semibold">
                                    {user.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <span className="text-gray-700 hidden md:inline">
                                Hi, <span className="font-semibold">{user.fullName || user.email}</span>
                            </span>
                        </div>
                    )}
                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    );
};

// Layout for public routes
const PublicLayout = () => {
    return (
        <header className="bg-white shadow-md p-4 mb-6">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-indigo-600">
                    Project Task Manager
                </div>
                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    );
};

// Route guards
const PrivateRoute = ({ children, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const PublicRoute = ({ children, isAuthenticated }) => {
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default App;