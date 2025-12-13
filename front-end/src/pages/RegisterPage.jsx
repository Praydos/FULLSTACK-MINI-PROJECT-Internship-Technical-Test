// src/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-4xl font-bold text-green-600 mb-2">
                    Join Project Task Manager
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Start managing your projects today
                </p>
            </div>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;