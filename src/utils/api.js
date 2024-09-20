import { toast } from 'sonner';

// Mock data
const mockProjects = [
  { id: 1, name: "Project Alpha", description: "A groundbreaking software development project", status: "In Progress" },
  { id: 2, name: "Project Beta", description: "An innovative marketing campaign", status: "Planning" },
  { id: 3, name: "Project Gamma", description: "A cutting-edge research initiative", status: "Completed" },
];

const mockUsers = [
  { id: 1, username: "john.doe@example.com", name: "John Doe", role: "Manager" },
  { id: 2, username: "jane.smith@example.com", name: "Jane Smith", role: "Developer" },
];

// Mock API functions
export const login = async (username) => {
  console.log('Attempting login with username:', username);
  if (username === 'danilo.reis@timenow.com.br') {
    console.log('Login successful');
    return { id: 1, username: username, name: "Danilo Reis", role: "Manager" };
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
  deleteProject
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
  deleteProject: wrappedDeleteProject
} = apiFunctions;
