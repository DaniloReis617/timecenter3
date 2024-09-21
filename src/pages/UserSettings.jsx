import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const { data: userProfile, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
  }, [userProfile]);

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    updateProfileMutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input id="avatar" type="file" onChange={handleAvatarChange} accept="image/*" />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={user?.name || ''} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={user?.email || ''} onChange={handleInputChange} readOnly />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" value={user?.role || ''} readOnly />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;