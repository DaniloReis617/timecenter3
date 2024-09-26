import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Ajuste conforme necessário

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (username) => {
  try {
    const response = await api.post('/login', { username });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get('/projetos');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch projects');
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const getProjectDetails = async (projectId) => {
  try {
    const response = await api.get(`/projetos/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch project details');
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projetos', projectData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create project');
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projetos/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update project');
  }
};

export const deleteProject = async (projectId) => {
  try {
    await api.delete(`/projetos/${projectId}`);
    return { message: 'Project deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete project');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/user-profile');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/user-profile', userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

// Funções específicas para Área, Recurso, etc.
export const getAreas = async () => {
  try {
    const response = await api.get('/areas');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch areas');
  }
};

export const createArea = async (data) => {
  try {
    const response = await api.post('/areas', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create area');
  }
};

export const updateArea = async (id, data) => {
  try {
    const response = await api.put(`/areas/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update area');
  }
};

export const deleteArea = async (id) => {
  try {
    await api.delete(`/areas/${id}`);
    return { success: true };
  } catch (error) {
    throw new Error('Failed to delete area');
  }
};

// Funções similares para Recursos, Apoios, etc.
export const getRecursos = async () => {
  try {
    const response = await api.get('/recursos');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recursos');
  }
};

export const createRecurso = async (data) => {
  try {
    const response = await api.post('/recursos', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create recurso');
  }
};

export const updateRecurso = async (id, data) => {
  try {
    const response = await api.put(`/recursos/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update recurso');
  }
};

export const deleteRecurso = async (id) => {
  try {
    await api.delete(`/recursos/${id}`);
    return { success: true };
  } catch (error) {
    throw new Error('Failed to delete recurso');
  }
};

// Exporte todas as funções
export {
  getAllProjects as wrappedGetAllProjects,
  getUsers as wrappedGetUsers,
  getProjectDetails as wrappedGetProjectDetails,
  createProject as wrappedCreateProject,
  updateProject as wrappedUpdateProject,
  deleteProject as wrappedDeleteProject,
  getUserProfile as wrappedGetUserProfile,
  updateUserProfile as wrappedUpdateUserProfile,
  getAreas as wrappedGetAreas,
  createArea as wrappedCreateArea,
  updateArea as wrappedUpdateArea,
  deleteArea as wrappedDeleteArea,
  getRecursos as wrappedGetRecursos,
  createRecurso as wrappedCreateRecurso,
  updateRecurso as wrappedUpdateRecurso,
  deleteRecurso as wrappedDeleteRecurso
};
