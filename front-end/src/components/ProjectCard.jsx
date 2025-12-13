// src/components/ProjectCard.jsx (UPDATED)
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProjectCard = ({ project, onEdit, onDelete }) => {
    const progress = project.progress || { progressPercentage: 0 };
    const percentage = Math.round(progress.progressPercentage);
    const barColor = percentage === 100 ? 'bg-green-500' : 'bg-indigo-500';

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <Link to={`/projects/${project.id}`}>
                            <h2 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition duration-200">
                                {project.title}
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {project.description || 'No description'}
                        </p>
                    </div>

                    <div className="flex space-x-2 ml-4">
                        <button
                            onClick={() => onEdit(project)}
                            className="p-2 text-blue-500 hover:text-blue-700 transition duration-150 rounded-full hover:bg-blue-50"
                            title="Edit Project"
                        >
                            <FaEdit size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(project.id)}
                            className="p-2 text-red-500 hover:text-red-700 transition duration-150 rounded-full hover:bg-red-50"
                            title="Delete Project"
                        >
                            <FaTrash size={18} />
                        </button>
                    </div>
                </div>

                {/* Progress Display */}
                <div className="mt-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                        <span>Progress</span>
                        <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                            className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {progress.completedTasks || 0} of {progress.totalTasks || 0} tasks completed
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;