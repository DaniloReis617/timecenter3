import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
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
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
