import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import HelpCenter from './components/HelpCenter/HelpCenter';
import PropertyOwnerDashboard from './components/PropertyOwner/PropertyOwnerDashboard';
import AddProperty from './components/PropertyOwner/AddProperty';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="help" element={<HelpCenter />} />
        <Route path="property-dashboard" element={<PropertyOwnerDashboard />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;