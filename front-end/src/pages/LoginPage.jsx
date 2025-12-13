// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-4xl font-bold text-indigo-600 mb-2">
                    Project Task Manager
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Manage your projects and tasks efficiently
                </p>
            </div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;