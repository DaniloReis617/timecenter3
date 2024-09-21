import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, FileText, DollarSign, Briefcase, 
  Award, Calendar, AlertTriangle, ShoppingCart, 
  GitMerge, Settings, LogOut, Menu, ChevronLeft, User
} from 'lucide-react';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const getAccessibleNavItems = (userProfile) => {
    const allNavItems = [
      { to: "/", icon: <Home size={20} />, title: "Home" },
      { to: "/stakeholders", icon: <Users size={20} />, title: "Stakeholders" },
      { to: "/scope", icon: <FileText size={20} />, title: "Escopo" },
      { to: "/costs", icon: <DollarSign size={20} />, title: "Custos" },
      { to: "/resources", icon: <Briefcase size={20} />, title: "Recursos" },
      { to: "/quality", icon: <Award size={20} />, title: "Qualidade" },
      { to: "/schedules", icon: <Calendar size={20} />, title: "Cronogramas" },
      { to: "/risks", icon: <AlertTriangle size={20} />, title: "Riscos" },
      { to: "/acquisitions", icon: <ShoppingCart size={20} />, title: "Aquisições" },
      { to: "/integration", icon: <GitMerge size={20} />, title: "Integração" },
      { to: "/admin", icon: <Settings size={20} />, title: "Administração" },
      { to: "/user-settings", icon: <User size={20} />, title: "User Settings" },
    ];

    if (userProfile === "Super Usuário" || userProfile === "Administrador") {
      return allNavItems;
    } else if (userProfile === "Gestor") {
      return allNavItems.filter(item => !["quality", "risks", "acquisitions", "integration", "admin"].includes(item.to.slice(1)));
    } else { // Visualizador
      return allNavItems.filter(item => ["", "stakeholders", "user-settings"].includes(item.to.slice(1)));
    }
  };

  const navItems = getAccessibleNavItems(user?.perfil);

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className={`bg-white shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'} flex flex-col`}>
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
      </nav>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-primary">
            {navItems.find(item => item.to === location.pathname)?.title || 'Page'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{format(currentTime, 'dd/MM/yyyy HH:mm:ss')}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-200">
                  <LogOut size={20} className="text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
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
