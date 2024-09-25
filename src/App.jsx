import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Stakeholders from './pages/Stakeholders';
import Scope from './pages/Scope';
import Costs from './pages/Costs';
import Resources from './pages/Resources';
import Quality from './pages/Quality';
import Schedules from './pages/Schedules';
import Risks from './pages/Risks';
import Acquisitions from './pages/Acquisitions';
import Integration from './pages/Integration';
import CadastroAuxiliar from './pages/CadastroAuxiliar';
import Admin from './pages/Admin';
import UserSettings from './pages/UserSettings';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const getAccessiblePages = (userProfile) => {
    if (userProfile === "Super Usuário" || userProfile === "Administrador") {
      return [
        { path: "/", element: <Home /> },
        { path: "/stakeholders", element: <Stakeholders /> },
        { path: "/scope", element: <Scope /> },
        { path: "/costs", element: <Costs /> },
        { path: "/resources", element: <Resources /> },
        { path: "/quality", element: <Quality /> },
        { path: "/schedules", element: <Schedules /> },
        { path: "/risks", element: <Risks /> },
        { path: "/acquisitions", element: <Acquisitions /> },
        { path: "/integration", element: <Integration /> },
        { path: "/cadastro-auxiliar", element: <CadastroAuxiliar /> },
        { path: "/admin", element: <Admin /> },
        { path: "/user-settings", element: <UserSettings /> },
      ];
    } else if (userProfile === "Gestor") {
      return [
        { path: "/", element: <Home /> },
        { path: "/stakeholders", element: <Stakeholders /> },
        { path: "/scope", element: <Scope /> },
        { path: "/costs", element: <Costs /> },
        { path: "/resources", element: <Resources /> },
        { path: "/schedules", element: <Schedules /> },
        { path: "/user-settings", element: <UserSettings /> },
      ];
    } else { // Visualizador
      return [
        { path: "/", element: <Home /> },
        { path: "/stakeholders", element: <Stakeholders /> },
        { path: "/user-settings", element: <UserSettings /> },
      ];
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <Layout user={user} onLogout={handleLogout}>
                    <Routes>
                      {getAccessiblePages(user?.perfil).map((page) => (
                        <Route key={page.path} path={page.path} element={page.element} />
                      ))}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
