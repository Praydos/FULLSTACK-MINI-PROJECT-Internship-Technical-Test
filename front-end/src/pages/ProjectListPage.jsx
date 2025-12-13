// src/pages/ProjectListPage.jsx (UPDATED)
import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';

const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await getProjects();
            setProjects(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (projectData) => {
        try {
            await createProject(projectData);
            setShowForm(false);
            fetchProjects();
        } catch (err) {
            alert("Error creating project: " + err.message);
        }
    };

    const handleUpdateProject = async (projectData) => {
        try {
            await updateProject(editingProject.id, projectData);
            setEditingProject(null);
            setShowForm(false);
            fetchProjects();
        } catch (err) {
            alert("Error updating project: " + err.message);
        }
    };

    const handleDeleteProject = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project and all its tasks?")) return;
        try {
            await deleteProject(projectId);
            fetchProjects();
        } catch (err) {
            alert("Error deleting project: " + err.message);
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleFormSubmit = (projectData) => {
        if (editingProject) {
            handleUpdateProject(projectData);
        } else {
            handleCreateProject(projectData);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading Projects...</div>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-600 text-xl p-8">
            Error: {error}
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Your Projects</h1>
                    <p className="text-gray-600 mt-2">
                        Manage all your projects and track progress
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingProject(null);
                        setShowForm(!showForm);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center"
                >
                    {showForm ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Project
                        </>
                    )}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
                    <ProjectForm
                        onSubmit={handleFormSubmit}
                        initialData={editingProject}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProject(null);
                        }}
                    />
                </div>
            )}

            {projects.length === 0 && !showForm ? (
                <div className="text-center py-12 bg-white rounded-xl shadow">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-4 text-xl font-medium text-gray-900">No projects yet</h3>
                    <p className="mt-2 text-gray-500">Get started by creating your first project.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Create Project
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectListPage;