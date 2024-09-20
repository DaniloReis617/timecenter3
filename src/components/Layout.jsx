import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, FileText, DollarSign, Briefcase, 
  Award, Calendar, AlertTriangle, ShoppingCart, 
  GitMerge, Settings, LogOut, Menu, ChevronLeft, User
} from 'lucide-react';
import { format } from 'date-fns';
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";

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
      { to: "/", icon: <Home />, title: "Home" },
      { to: "/stakeholders", icon: <Users />, title: "Stakeholders" },
      { to: "/scope", icon: <FileText />, title: "Escopo" },
      { to: "/costs", icon: <DollarSign />, title: "Custos" },
      { to: "/resources", icon: <Briefcase />, title: "Recursos" },
      { to: "/quality", icon: <Award />, title: "Qualidade" },
      { to: "/schedules", icon: <Calendar />, title: "Cronogramas" },
      { to: "/risks", icon: <AlertTriangle />, title: "Riscos" },
      { to: "/acquisitions", icon: <ShoppingCart />, title: "Aquisições" },
      { to: "/integration", icon: <GitMerge />, title: "Integração" },
      { to: "/admin", icon: <Settings />, title: "Administração" },
    ];

    if (userProfile === "Super Usuário" || userProfile === "Administrador") {
      return allNavItems;
    } else if (userProfile === "Gestor") {
      return allNavItems.filter(item => !["quality", "risks", "acquisitions", "integration", "admin"].includes(item.to.slice(1)));
    } else { // Visualizador
      return allNavItems.filter(item => ["", "stakeholders"].includes(item.to.slice(1)));
    }
  };

  const navItems = getAccessibleNavItems(user?.perfil);

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className={`bg-white shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex justify-between items-center">
          {isExpanded && <h1 className="text-2xl font-bold">TimeCenter</h1>}
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200">
            {isExpanded ? <ChevronLeft /> : <Menu />}
          </button>
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link 
                to={item.to} 
                className={`flex items-center py-2 px-4 hover:bg-gray-200 rounded ${location.pathname === item.to ? 'bg-gray-200' : ''}`}
              >
                {item.icon}
                {isExpanded && <span className="ml-4">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{navItems.find(item => item.to === location.pathname)?.title || 'Page'}</h2>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">{user?.nome || 'User'}</span>
              <span className="text-sm text-gray-600">{user?.perfil || 'Role'}</span>
              <span>{format(currentTime, 'dd/MM/yyyy HH:mm:ss')}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-gray-200"
                  >
                    <LogOut className="h-5 w-5 text-gray-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
