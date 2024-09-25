import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, ChevronLeft, User } from 'lucide-react';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNavItems } from '@/nav-items';

const Layout = ({ children, user, onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const navItems = getNavItems(user?.perfil);

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${isExpanded ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          {isExpanded && <h1 className="text-2xl font-bold text-primary">TimeCenter</h1>}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200">
            {isExpanded ? <ChevronLeft size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        <ul className="space-y-2 p-4 flex-grow">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link 
                to={item.to} 
                className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                  location.pathname === item.to 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {item.icon}
                {isExpanded && <span className="ml-4">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto p-4 border-t border-gray-200">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="w-full flex justify-start items-center p-2 rounded-full hover:bg-gray-200">
                <LogOut size={20} className="text-gray-600" />
                {isExpanded && <span className="ml-4">Logout</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-primary">
            {navItems.find(item => item.to === location.pathname)?.title || 'Page'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{format(currentTime, 'dd/MM/yyyy HH:mm:ss')}</span>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={user?.avatarUrl} alt={user?.nome} />
                <AvatarFallback>{user?.nome?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user?.nome || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.perfil || 'Role'}</p>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
