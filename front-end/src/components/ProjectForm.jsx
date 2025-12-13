// src/components/ProjectForm.jsx (UPDATED)
import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, description });
        if (!initialData) {
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-medium mb-3">
                {initialData ? 'Edit Project' : 'Create New Project'}
            </h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter project title"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter project description"
                    rows="3"
                />
            </div>
            <div className="flex space-x-3">
                <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    {initialData ? 'Update Project' : 'Add Project'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProjectForm;