import { toast } from 'sonner';

// Mock data for each type of cadastro
const mockData = {
  Despesa: [],
  "Sist. Operacional": [],
  "Situação Motivo": [],
  "Setor Solicitante": [],
  "Setor Responsável": [],
  Serviço: [],
  Recurso: [],
  Planta: [],
  Informativo: [],
  "Familia Equip.": [],
  Executante: [],
  Especialidade: [],
  "Escopo Tipo": [],
  "Escopo Origem": [],
  Área: [],
  Apoio: [],
};

// Generate some initial data for each type
Object.keys(mockData).forEach(key => {
  for (let i = 1; i <= 5; i++) {
    if (key === 'Apoio') {
      mockData[key].push({
        ID: i,
        TX_DESCRICAO: `Apoio ${i}`,
        TX_TIPO: `Tipo ${i % 3 + 1}`,
        VL_VALOR_CUSTO: Math.random() * 1000,
        VL_PERCENTUAL_CUSTO: Math.random() * 100
      });
    } else {
      mockData[key].push({ ID: i, TX_DESCRICAO: `${key} ${i}` });
    }
  }
});

// Add VL_QUANTIDADE_DIAS_EXECUCAO for Área
mockData['Área'].forEach(item => {
  item.VL_QUANTIDADE_DIAS_EXECUCAO = Math.random() * 10;
});

// Add VL_VALOR_CUSTO for Recurso
mockData['Recurso'].forEach(item => {
  item.VL_VALOR_CUSTO = Math.random() * 1000;
});

export const getItems = async (type) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockData[type];
};

export const createItem = async ({ type, data }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const newItem = { ...data, ID: mockData[type].length + 1 };
  mockData[type].push(newItem);
  return newItem;
};

export const updateItem = async ({ type, id, data }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const index = mockData[type].findIndex(item => item.ID === id);
  if (index !== -1) {
    mockData[type][index] = { ...mockData[type][index], ...data };
    return mockData[type][index];
  }
  throw new Error('Item not found');
};

export const deleteItem = async ({ type, id }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const index = mockData[type].findIndex(item => item.ID === id);
  if (index !== -1) {
    mockData[type].splice(index, 1);
    return { success: true };
  }
  throw new Error('Item not found');
};

// Specific functions for Área
export const getAreas = async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockData['Área'];
};

export const createArea = async ({ data }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const newArea = { ...data, ID: mockData['Área'].length + 1 };
  mockData['Área'].push(newArea);
  return newArea;
};

export const updateArea = async ({ id, data }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const index = mockData['Área'].findIndex(item => item.ID === id);
  if (index !== -1) {
    mockData['Área'][index] = { ...mockData['Área'][index], ...data };
    return mockData['Área'][index];
  }
  throw new Error('Área not found');
};

export const deleteArea = async ({ id }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const index = mockData['Área'].findIndex(item => item.ID === id);
  if (index !== -1) {
    mockData['Área'].splice(index, 1);
    return { success: true };
  }
  throw new Error('Área not found');
};

// Specific functions for Recurso
export const getRecursos = async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockData['Recurso'];
};

export const createRecurso = async ({ data }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const newRecurso = { ...data, ID: mockData['Recurso'].length + 1 };
  mockData['Recurso'].push(newRecurso);
  return newRecurso;
};

export const updateRecurso = async ({ id, data }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const index = mockData['Recurso'].findIndex(item => item.ID === id);
  if (index !== -1) {
    mockData['Recurso'][index] = { ...mockData['Recurso'][index], ...data };
    return mockData['Recurso'][index];
  }
  throw new Error('Recurso not found');
};

export const deleteRecurso = async ({ id }) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const index = mockData['Recurso'].findIndex(item => item.ID === id);
  if (index !== -1) {
    mockData['Recurso'].splice(index, 1);
    return { success: true };
  }
  throw new Error('Recurso not found');
};

// Mock data for projects
const mockProjects = [
  { id: 1, name: "Project Alpha", description: "A groundbreaking software development project", status: "In Progress" },
  { id: 2, name: "Project Beta", description: "An innovative marketing campaign", status: "Planning" },
  { id: 3, name: "Project Gamma", description: "A cutting-edge research initiative", status: "Completed" },
];

const mockUsers = [
  { id: 1, username: "john.doe@example.com", name: "John Doe", role: "Manager", avatarUrl: "https://example.com/avatar1.jpg" },
  { id: 2, username: "jane.smith@example.com", name: "Jane Smith", role: "Developer", avatarUrl: "https://example.com/avatar2.jpg" },
];

// Mock API functions
export const login = async (username) => {
  console.log('Attempting login with username:', username);
  if (username === 'danilo.reis@timenow.com.br') {
    console.log('Login successful');
    return { id: 1, username: username, name: "Danilo Reis", perfil: "Super Usuário", avatarUrl: "https://example.com/danilo.jpg" };
  }
  throw new Error('Invalid email');
};

export const getAllProjects = async () => {
  console.log('Fetching all projects');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  console.log('Projects fetched:', mockProjects);
  return mockProjects;
};

export const getUsers = async () => {
  console.log('Fetching users');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  console.log('Users fetched:', mockUsers);
  return mockUsers;
};

export const getProjectDetails = async (projectId) => {
  console.log('Fetching project details for projectId:', projectId);
  const project = mockProjects.find(p => p.id === projectId);
  if (project) {
    console.log('Project details:', project);
    return project;
  }
  throw new Error('Project not found');
};

export const createProject = async (projectData) => {
  console.log('Creating project with data:', projectData);
  const newProject = { id: mockProjects.length + 1, ...projectData };
  mockProjects.push(newProject);
  console.log('New project created:', newProject);
  return newProject;
};

export const updateProject = async (projectId, projectData) => {
  console.log('Updating project:', projectId, 'with data:', projectData);
  const index = mockProjects.findIndex(p => p.id === projectId);
  if (index !== -1) {
    mockProjects[index] = { ...mockProjects[index], ...projectData };
    console.log('Project updated:', mockProjects[index]);
    return mockProjects[index];
  }
  throw new Error('Project not found');
};

export const deleteProject = async (projectId) => {
  console.log('Deleting project:', projectId);
  const index = mockProjects.findIndex(p => p.id === projectId);
  if (index !== -1) {
    const deletedProject = mockProjects.splice(index, 1)[0];
    console.log('Project deleted:', deletedProject);
    return { message: 'Project deleted successfully' };
  }
  throw new Error('Project not found');
};

export const getUserProfile = async () => {
  console.log('Fetching user profile');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  const user = mockUsers[0]; // For demonstration, always return the first user
  console.log('User profile fetched:', user);
  return user;
};

export const updateUserProfile = async (userData) => {
  console.log('Updating user profile with data:', userData);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  const updatedUser = { ...mockUsers[0], ...userData };
  mockUsers[0] = updatedUser;
  console.log('User profile updated:', updatedUser);
  return updatedUser;
};

// Simulated API error handling
const simulateApiCall = async (func) => {
  try {
    return await func();
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error.message || 'An unexpected error occurred');
    throw error;
  }
};

// Wrap all exported functions with error handling
const apiFunctions = {
  login,
  getAllProjects,
  getUsers,
  getProjectDetails,
  createProject,
  updateProject,
  deleteProject,
  getUserProfile,
  updateUserProfile,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getAreas,
  createArea,
  updateArea,
  deleteArea,
  getRecursos,
  createRecurso,
  updateRecurso,
  deleteRecurso
};

Object.keys(apiFunctions).forEach(key => {
  const originalFunc = apiFunctions[key];
  apiFunctions[key] = (...args) => simulateApiCall(() => originalFunc(...args));
});

export const {
  getAllProjects: wrappedGetAllProjects,
  getUsers: wrappedGetUsers,
  getProjectDetails: wrappedGetProjectDetails,
  createProject: wrappedCreateProject,
  updateProject: wrappedUpdateProject,
  deleteProject: wrappedDeleteProject,
  getUserProfile: wrappedGetUserProfile,
  updateUserProfile: wrappedUpdateUserProfile,
  getItems: wrappedGetItems,
  createItem: wrappedCreateItem,
  updateItem: wrappedUpdateItem,
  deleteItem: wrappedDeleteItem,
  getAreas: wrappedGetAreas,
  createArea: wrappedCreateArea,
  updateArea: wrappedUpdateArea,
  deleteArea: wrappedDeleteArea,
  getRecursos: wrappedGetRecursos,
  createRecurso: wrappedCreateRecurso,
  updateRecurso: wrappedUpdateRecurso,
  deleteRecurso: wrappedDeleteRecurso
} = apiFunctions;
