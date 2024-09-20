import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold">TimeCenter</h1>
        </div>
        <ul className="space-y-2 p-4">
          <li><Link to="/" className="block py-2 px-4 hover:bg-gray-200">Home</Link></li>
          <li><Link to="/stakeholders" className="block py-2 px-4 hover:bg-gray-200">Stakeholders</Link></li>
          <li><Link to="/scope" className="block py-2 px-4 hover:bg-gray-200">Scope</Link></li>
          <li><Link to="/costs" className="block py-2 px-4 hover:bg-gray-200">Costs</Link></li>
          <li><Link to="/resources" className="block py-2 px-4 hover:bg-gray-200">Resources</Link></li>
          <li><Link to="/quality" className="block py-2 px-4 hover:bg-gray-200">Quality</Link></li>
          <li><Link to="/schedules" className="block py-2 px-4 hover:bg-gray-200">Schedules</Link></li>
          <li><Link to="/risks" className="block py-2 px-4 hover:bg-gray-200">Risks</Link></li>
          <li><Link to="/acquisitions" className="block py-2 px-4 hover:bg-gray-200">Acquisitions</Link></li>
          <li><Link to="/integration" className="block py-2 px-4 hover:bg-gray-200">Integration</Link></li>
          <li><Link to="/admin" className="block py-2 px-4 hover:bg-gray-200">Admin</Link></li>
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;