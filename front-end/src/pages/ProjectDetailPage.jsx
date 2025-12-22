// src/pages/ProjectDetailPage.jsx (UPDATED - FIXED handleToggleComplete)
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectDetails, createTask, updateTask, deleteTask } from '../api/api';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    const fetchProject = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProjectDetails(projectId);
            setProject(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            if (err.message.includes('401') || err.message.includes('403')) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }, [projectId, navigate]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    const handleCreateTask = async (taskData) => {
        try {
            await createTask(projectId, taskData);
            setEditingTask(null);
            fetchProject();
        } catch (err) {
            alert("Error creating task: " + err.message);
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            await updateTask(projectId, editingTask.id, taskData);
            setEditingTask(null);
            fetchProject();
        } catch (err) {
            alert("Error updating task: " + err.message);
        }
    };

    // FIXED: This was sending only status, causing other fields to be null
    const handleToggleComplete = async (taskId, newStatus) => {
        try {
            // Find the current task from project.tasks
            const currentTask = project.tasks.find(task => task.id === taskId);
            if (!currentTask) {
                alert("Task not found");
                return;
            }

            // Create update data with ALL task fields
            const updateData = {
                title: currentTask.title,
                description: currentTask.description,
                dueDate: currentTask.dueDate,
                status: newStatus
            };

            await updateTask(projectId, taskId, updateData);
            await fetchProject();
        } catch (err) {
            alert("Error updating task status: " + err.message);
        }
    };

    // OR EVEN BETTER: Accept the entire task object from TaskItem
    const handleToggleCompleteV2 = async (task, newStatus) => {
        try {
            // Create update data with ALL task fields from the passed task object
            const updateData = {
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status: newStatus
            };

            await updateTask(projectId, task.id, updateData);
            await fetchProject();
        } catch (err) {
            alert("Error updating task status: " + err.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await deleteTask(projectId, taskId);
            fetchProject();
        } catch (err) {
            alert("Error deleting task: " + err.message);
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleTaskFormSubmit = (taskData) => {
        if (editingTask) {
            handleUpdateTask(taskData);
        } else {
            handleCreateTask(taskData);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading Project Details...</div>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-600 text-xl p-8">
            Error: {error}
        </div>
    );

    if (!project) return (
        <div className="text-center text-gray-500 text-xl p-8">
            Project Not Found
        </div>
    );

    const percentage = Math.round(project.progress?.progressPercentage || 0);
    const barColor = percentage === 100 ? 'bg-green-500' : 'bg-indigo-500';

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">{project.title}</h1>
                <p className="text-lg text-gray-600 mt-2">{project.description || 'No description'}</p>
            </div>

            {/* Progress Bar Display */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-gray-700">Overall Progress</span>
                    <span className="text-2xl font-semibold text-indigo-600">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                        className={`h-4 rounded-full transition-all duration-700 ${barColor}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span>
                        {project.progress?.completedTasks || 0} completed tasks
                    </span>
                    <span>
                        {project.progress?.totalTasks || 0} total tasks
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Task Form */}
                <div className="lg:col-span-1">
                    <div className="p-6 bg-white rounded-xl shadow-lg sticky top-6">
                        <TaskForm
                            onSubmit={handleTaskFormSubmit}
                            initialData={editingTask}
                            onCancel={() => setEditingTask(null)}
                        />
                    </div>
                </div>

                {/* Task List */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
                        <span className="text-gray-500">
                            {project.tasks?.length || 0} tasks
                        </span>
                    </div>

                    <div className="space-y-4">
                        {project.tasks && project.tasks.length > 0 ? (
                            project.tasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onComplete={(taskId, newStatus) => handleToggleComplete(taskId, newStatus)}
                                    // OR use this better version if you update TaskItem:
                                    // onComplete={(task, newStatus) => handleToggleCompleteV2(task, newStatus)}
                                    onDelete={handleDeleteTask}
                                    onEdit={handleEditTask}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow">
                                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks yet</h3>
                                <p className="mt-1 text-gray-500">Get started by adding your first task.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;