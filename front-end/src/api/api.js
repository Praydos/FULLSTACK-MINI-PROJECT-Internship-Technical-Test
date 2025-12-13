// src/api/api.js
const BASE_URL = 'http://localhost:8080/api';

// Token management
let authToken = localStorage.getItem('token');

export const setAuthToken = (token) => {
    authToken = token;
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    return authToken;
};

export const isAuthenticated = () => {
    return !!authToken;
};

export const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
};

// Helper function for authenticated requests
const authFetch = async (url, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, { ...options, headers });
    return handleResponse(response);
};

const handleResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            logout();
            throw new Error('Session expired. Please login again.');
        }
        const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(error.message || 'Request failed');
    }
    if (response.status === 204) return null;
    return response.json();
};

// --- AUTHENTICATION API ---
export const register = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    if (data.token) {
        setAuthToken(data.token);
        localStorage.setItem('user', JSON.stringify({
            email: data.email,
            fullName: data.fullName,
            userId: data.userId
        }));
    }
    return data;
};

export const login = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    if (data.token) {
        setAuthToken(data.token);
        localStorage.setItem('user', JSON.stringify({
            email: data.email,
            fullName: data.fullName,
            userId: data.userId
        }));
    }
    return data;
};

export const getProfile = async () => {
    return authFetch(`${BASE_URL}/auth/profile`);
};

// --- PROJECTS API ---
export const getProjects = async () => {
    return authFetch(`${BASE_URL}/projects`);
};

export const createProject = async (projectData) => {
    return authFetch(`${BASE_URL}/projects`, {
        method: 'POST',
        body: JSON.stringify(projectData),
    });
};

export const getProjectDetails = async (id) => {
    return authFetch(`${BASE_URL}/projects/${id}`);
};

export const updateProject = async (id, projectData) => {
    return authFetch(`${BASE_URL}/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
    });
};

export const deleteProject = async (id) => {
    return authFetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
    });
};

export const getProjectProgress = async (id) => {
    return authFetch(`${BASE_URL}/projects/${id}/progress`);
};

// --- TASKS API ---
export const getTasksByProject = async (projectId) => {
    return authFetch(`${BASE_URL}/projects/${projectId}/tasks`);
};

export const createTask = async (projectId, taskData) => {
    return authFetch(`${BASE_URL}/projects/${projectId}/tasks`, {
        method: 'POST',
        body: JSON.stringify(taskData),
    });
};

export const updateTask = async (projectId, taskId, taskData) => {
    return authFetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
    });
};

export const markTaskComplete = async (projectId, taskId) => {
    return authFetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}/complete`, {
        method: 'PATCH',
    });
};

export const deleteTask = async (projectId, taskId) => {
    return authFetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
        method: 'DELETE',
    });
};