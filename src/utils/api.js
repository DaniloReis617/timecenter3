import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Ajuste conforme necessário

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (username) => {
  try {
    console.log(`Tentando fazer login com o usuário: ${username}`);
    const response = await api.post('/login', { username });
    console.log('Resposta do login:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error.response ? error.response.data : error.message);
    throw new Error('Falha no login');
  }
};

export const getAllProjects = async () => {
  try {
    console.log('Buscando todos os projetos');
    const response = await api.get('/projetos');
    console.log('Projetos recebidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error.response ? error.response.data : error.message);
    throw new Error('Falha ao buscar projetos');
  }
};

export const wrappedGetAllProjects = async () => {
  try {
    const projects = await getAllProjects();
    return projects.map(project => ({
      ...project,
      name: project.TX_DESCRICAO // Garantir que a propriedade 'name' está definida para compatibilidade
    }));
  } catch (error) {
    console.error('Erro ao buscar e processar projetos:', error);
    throw new Error('Falha ao buscar e processar projetos');
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

export const getItems = async (type) => {
  try {
    const response = await api.get(`/${type}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch ${type}`);
  }
};

export const createItem = async ({ type, data }) => {
  try {
    const response = await api.post(`/${type}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create ${type}`);
  }
};

export const updateItem = async ({ type, id, data }) => {
  try {
    const response = await api.put(`/${type}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update ${type}`);
  }
};

export const deleteItem = async ({ type, id }) => {
  try {
    await api.delete(`/${type}/${id}`);
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete ${type}`);
  }
};


// Adicionando uma nova função de teste de conexão
export const testDatabaseConnection = async () => {
  try {
    const response = await api.get('/test-connection');
    console.log('Resultado do teste de conexão:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao testar conexão com o banco de dados:', error.response ? error.response.data : error.message);
    throw new Error('Falha ao testar conexão com o banco de dados');
  }
};
