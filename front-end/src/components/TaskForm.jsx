// src/components/TaskForm.jsx (UPDATED)
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setDueDate(initialData.dueDate ? initialData.dueDate.substring(0, 10) : '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const taskData = {
            title,
            description,
            dueDate: dueDate || null,
            status: initialData ? initialData.status : 'IN_PROGRESS'
        };

        onSubmit(taskData);
        if (!initialData) {
            setTitle('');
            setDescription('');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {initialData ? 'Edit Task' : 'Add New Task'}
            </h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter task title"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter task description"
                    rows="3"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
            <div className="flex space-x-3">
                <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    {initialData ? 'Update Task' : 'Create Task'}
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

export default TaskForm;