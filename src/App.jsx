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
import Admin from './pages/Admin';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
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
                      <Route path="/" element={<Home />} />
                      <Route path="/stakeholders" element={<Stakeholders />} />
                      <Route path="/scope" element={<Scope />} />
                      <Route path="/costs" element={<Costs />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/quality" element={<Quality />} />
                      <Route path="/schedules" element={<Schedules />} />
                      <Route path="/risks" element={<Risks />} />
                      <Route path="/acquisitions" element={<Acquisitions />} />
                      <Route path="/integration" element={<Integration />} />
                      <Route path="/admin" element={<Admin />} />
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
