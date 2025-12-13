// src/components/TaskItem.jsx (UPDATED)
import React from 'react';
import { FaCheckCircle, FaRegCircle, FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {
    const isCompleted = task.status === 'COMPLETED';
    const statusColor = isCompleted ? 'text-green-600' : 'text-yellow-600';
    const statusText = isCompleted ? 'Completed' : 'In Progress';

    // Format the date for display
    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date';

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition duration-200">
            <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">{task.description}</p>
                <div className="flex items-center text-xs mt-1 space-x-3">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${statusColor} bg-opacity-10`}
                          style={{ backgroundColor: isCompleted ? 'rgb(16 185 129 / 0.1)' : 'rgb(245 158 11 / 0.1)' }}>
                        {statusText}
                    </span>
                    <span className="text-indigo-500">Due: {dueDate}</span>
                </div>
            </div>

            <div className="flex space-x-2 ml-4">
                {/* Edit Button */}
                <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-blue-500 hover:text-blue-700 transition duration-150 rounded-full hover:bg-blue-50"
                    title="Edit Task"
                >
                    <FaPencilAlt size={18} />
                </button>

                {/* Complete/Uncomplete Button */}
                <button
                    onClick={() => onComplete(task.id, isCompleted ? 'IN_PROGRESS' : 'COMPLETED')}
                    className={`p-2 transition duration-150 rounded-full hover:bg-opacity-20 ${
                        isCompleted
                            ? 'text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100'
                            : 'text-green-500 hover:text-green-700 hover:bg-green-100'
                    }`}
                    title={isCompleted ? "Mark In Progress" : "Mark Complete"}
                >
                    {isCompleted ? <FaCheckCircle size={18} /> : <FaRegCircle size={18} />}
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition duration-150 rounded-full hover:bg-red-50"
                    title="Delete Task"
                >
                    <FaTrashAlt size={18} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;