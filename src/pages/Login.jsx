import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input id="email-address" name="email" type="email" autoComplete="email" required className="mb-2" placeholder="Email address" />
            </div>
            <div>
              <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;