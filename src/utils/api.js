import axios from 'axios';
import { toast } from 'sonner';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

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

const retryRequest = (error, retryCount = 0) => {
  const { config } = error;
  if (retryCount < MAX_RETRIES) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Retrying request (${retryCount + 1}/${MAX_RETRIES})...`);
        resolve(api(config));
      }, RETRY_DELAY);
    });
  }
  return Promise.reject(error);
};

// Interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      toast.error(`Error ${error.response.status}: ${error.response.data.message || 'An error occurred'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      if (error.code === 'ECONNABORTED') {
        toast.error('The request timed out. Retrying...');
        return retryRequest(error);
      }
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
    console.log('Attempting login with username:', username);
    const response = await api.post('/login', { username });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getProjects = async (userId) => {
  try {
    console.log('Fetching projects for userId:', userId);
    const response = await api.get(`/projects/${userId}`);
    console.log('Projects response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    console.log('Fetching all projects');
    const response = await api.get('/projects');
    console.log('All projects response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    console.log('Fetching users');
    const response = await api.get('/users');
    console.log('Users response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getProjectDetails = async (projectId) => {
  try {
    console.log('Fetching project details for projectId:', projectId);
    const response = await api.get(`/projects/${projectId}/details`);
    console.log('Project details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    console.log('Creating project with data:', projectData);
    const response = await api.post('/projects', projectData);
    console.log('Create project response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    console.log('Updating project:', projectId, 'with data:', projectData);
    const response = await api.put(`/projects/${projectId}`, projectData);
    console.log('Update project response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    console.log('Deleting project:', projectId);
    const response = await api.delete(`/projects/${projectId}`);
    console.log('Delete project response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export default api;
