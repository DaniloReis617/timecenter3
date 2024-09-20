import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds timeout
});

// Database configuration (to be used by backend)
export const dbConfig = {
  driver: "ODBC Driver 17 for SQL Server",
  server: "tcp:easysolutions-prd.database.windows.net",
  database: "easysolutions",
  username: "easysolutions",
  password: "$3nh@ES#2022"
};

// Interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      toast.error(`Error ${error.response.status}: ${error.response.data.message || 'An error occurred'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      toast.error('Network error: Unable to connect to the server. Please check your internet connection and try again.');
    } else {
      console.error('Error message:', error.message);
      toast.error('An unexpected error occurred. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export const login = async (username) => {
  try {
    const response = await api.post('/login', { username });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.code === 'ECONNABORTED') {
      toast.error('The request timed out. Please check your internet connection and try again.');
    }
    throw error;
  }
};

export const getProjects = async (userId) => {
  try {
    const response = await api.get(`/projects/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getProjectDetails = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}/details`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export default api;
