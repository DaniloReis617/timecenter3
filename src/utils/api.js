import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:3000/api'; // Ajuste para a URL real da sua API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};

export const getAllProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar projetos');
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar usuários');
  }
};

export const getProjectDetails = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar detalhes do projeto');
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao criar projeto');
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar projeto');
  }
};

export const deleteProject = async (projectId) => {
  try {
    await api.delete(`/projects/${projectId}`);
    return { message: 'Projeto excluído com sucesso' };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir projeto');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar perfil do usuário');
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil do usuário');
  }
};

// Tratamento de erros global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    toast.error(error.response?.data?.message || 'Ocorreu um erro inesperado');
    return Promise.reject(error);
  }
);

export default api;
