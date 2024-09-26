import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wrappedGetAllProjects, testDatabaseConnection } from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InfoIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: wrappedGetAllProjects,
  });

  useEffect(() => {
    if (selectedProject) {
      localStorage.setItem('selectedProject', JSON.stringify(selectedProject));
    }
  }, [selectedProject]);

  const handleTestConnection = async () => {
    try {
      const result = await testDatabaseConnection();
      setConnectionStatus(result);
    } catch (error) {
      setConnectionStatus({ success: false, message: error.message });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to TimeCenter</h1>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to TimeCenter</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load projects. Please try again later.
            {error.message && <p className="mt-2">Error details: {error.message}</p>}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to TimeCenter</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the sidebar to navigate between sections.</li>
            <li>Each section offers different functionalities related to project management.</li>
            <li>Click on a section in the menu on the left to begin.</li>
          </ul>
        </CardContent>
      </Card>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Select a section in the menu to start exploring the application.
        </AlertDescription>
      </Alert>

      {projects && projects.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Select a Project</h2>
          <Select onValueChange={(value) => setSelectedProject(JSON.parse(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a project to filter information on other screens" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.GID} value={JSON.stringify(project)}>
                  {project.TX_DESCRICAO}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedProject && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Project: {selectedProject.TX_DESCRICAO}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>GID:</strong> {selectedProject.GID}</p>
                <p><strong>Status:</strong> {selectedProject.FL_STATUS === 'A' ? 'Active' : 'Inactive'}</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Projects Available</AlertTitle>
          <AlertDescription>
            There are no active projects available for selection.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleTestConnection}>Test Database Connection</Button>
          {connectionStatus && (
            <Alert variant={connectionStatus.success ? "default" : "destructive"} className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{connectionStatus.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{connectionStatus.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
