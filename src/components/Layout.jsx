import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, FileText, DollarSign, Briefcase, 
  Award, Calendar, AlertTriangle, ShoppingCart, 
  GitMerge, Settings, LogOut, Menu, ChevronLeft, User
} from 'lucide-react';
import { format } from 'date-fns';

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

  const navItems = [
    { to: "/", icon: <Home />, title: "Home" },
    { to: "/stakeholders", icon: <Users />, title: "Stakeholders" },
    { to: "/scope", icon: <FileText />, title: "Scope" },
    { to: "/costs", icon: <DollarSign />, title: "Costs" },
    { to: "/resources", icon: <Briefcase />, title: "Resources" },
    { to: "/quality", icon: <Award />, title: "Quality" },
    { to: "/schedules", icon: <Calendar />, title: "Schedules" },
    { to: "/risks", icon: <AlertTriangle />, title: "Risks" },
    { to: "/acquisitions", icon: <ShoppingCart />, title: "Acquisitions" },
    { to: "/integration", icon: <GitMerge />, title: "Integration" },
    { to: "/admin", icon: <Settings />, title: "Admin" },
  ];

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
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{navItems.find(item => item.to === location.pathname)?.title || 'Page'}</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{user?.name || 'User'}</p>
              <p className="text-sm text-gray-600">{user?.role || 'Role'}</p>
            </div>
            <User className="h-8 w-8 text-gray-600" />
            <div className="text-right">
              <p className="font-semibold">{format(currentTime, 'dd/MM/yyyy')}</p>
              <p className="text-sm text-gray-600">{format(currentTime, 'HH:mm:ss')}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <LogOut className="mr-2" />
              Logout
            </button>
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
