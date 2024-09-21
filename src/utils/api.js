import { toast } from 'sonner';

// Mock data
const mockProjects = [
  { id: 1, name: "Project Alpha", description: "A groundbreaking software development project", status: "In Progress" },
  { id: 2, name: "Project Beta", description: "An innovative marketing campaign", status: "Planning" },
  { id: 3, name: "Project Gamma", description: "A cutting-edge research initiative", status: "Completed" },
];

const mockUsers = [
  { id: 1, username: "john.doe@example.com", name: "John Doe", role: "Manager", avatarUrl: "https://example.com/avatar1.jpg" },
  { id: 2, username: "jane.smith@example.com", name: "Jane Smith", role: "Developer", avatarUrl: "https://example.com/avatar2.jpg" },
];

let appSettings = {
  logo: '',
  theme: 'light',
  primaryColor: '#4b6357',
  secondaryColor: '#f7f8fa',
  loginImage: '',
  homeImage: '',
};

// Mock API functions
export const login = async (username) => {
  console.log('Attempting login with username:', username);
  if (username === 'danilo.reis@timenow.com') {
    console.log('Login successful');
    return { id: 1, username: username, name: "Danilo Reis", perfil: "Desenvolvedor", email: "danilo.reis@timenow.com", avatarUrl: "https://example.com/danilo.jpg" };
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

export const updateAppSettings = async (newSettings) => {
  console.log('Updating app settings with data:', newSettings);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  appSettings = { ...appSettings, ...newSettings };
  console.log('App settings updated:', appSettings);
  return appSettings;
};

export const getAppSettings = async () => {
  console.log('Fetching app settings');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  console.log('App settings fetched:', appSettings);
  return appSettings;
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
  updateAppSettings,
  getAppSettings
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
  updateAppSettings: wrappedUpdateAppSettings,
  getAppSettings: wrappedGetAppSettings
} = apiFunctions;
