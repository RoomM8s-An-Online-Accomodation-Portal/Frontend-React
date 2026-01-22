import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from './AppLayout';
import Navbar from '../Navbar/Navbar';
import { dataStore } from '../../utils/dataStore';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authKey, setAuthKey] = useState(0);

  // Determine if search should be shown based on current route
  const showSearch = location.pathname === '/';

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthKey(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Navigation handlers that map to routes
  const handleNavbarLogin = () => {
    navigate('/login');
  };

  const handleHelpCenter = () => {
    navigate('/help');
  };

  const handlePropertyOwner = () => {
    navigate('/property-dashboard');
  };

  const handleLogout = () => {
    setAuthKey(prev => prev + 1);
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handlePropertyAdded = (newProperty) => {
    dataStore.addRoom(newProperty);
  };

  return (
    <AppLayout 
      navbar={
        <Navbar 
          key={authKey}
          onSearch={(query) => {}} 
          onLoginClick={handleNavbarLogin}
          onLogoutClick={handleLogout}
          onHelpClick={handleHelpCenter}
          onPropertyOwnerClick={handlePropertyOwner}
          onLogoClick={handleLogoClick}
          showSearch={showSearch}
        />
      } 
      showSearch={showSearch}
    >
      <Outlet context={{ handlePropertyAdded, authKey, setAuthKey }} />
    </AppLayout>
  );
};

export default Layout;