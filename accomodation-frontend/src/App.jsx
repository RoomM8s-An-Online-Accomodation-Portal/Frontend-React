import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import HelpCenter from './components/HelpCenter/HelpCenter';
import PropertyOwnerDashboard from './components/PropertyOwner/PropertyOwnerDashboard';
import AddProperty from './components/PropertyOwner/AddProperty';
import ContactUs from './components/ContactUs';
import About from './components/About';
import Events from './components/Events';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="help" element={<HelpCenter />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="property-dashboard" element={<PropertyOwnerDashboard />} />
        <Route path="add-property" element={<AddProperty />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;