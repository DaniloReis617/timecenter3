import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to TimeCenter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome to TimeCenter</h1>
        <p className="text-red-500">Error loading projects: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to TimeCenter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects && projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <p className="text-sm text-gray-500 mt-2">Status: {project.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
