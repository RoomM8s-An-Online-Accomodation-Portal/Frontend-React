import React, { useState, useEffect } from 'react';
import { mockUsers } from '../../data/mockData';
import { dataStore } from '../../utils/dataStore';
import Toast from '../Toast/Toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyImages, setShowPropertyImages] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', type: 'Guest', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', type: 'Host', status: 'Active', joinDate: '2024-02-10' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', type: 'Guest', status: 'Blocked', joinDate: '2024-01-20' }
  ]);

  const [properties, setProperties] = useState([
    { 
      id: 1, 
      title: 'Cozy Apartment', 
      owner: 'Jane Smith', 
      status: 'Approved', 
      location: 'Mumbai', 
      price: '₹2500',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400'
      ]
    },
    { 
      id: 2, 
      title: 'Beach Villa', 
      owner: 'Alex Brown', 
      status: 'Pending', 
      location: 'Goa', 
      price: '₹5000',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400'
      ]
    },
    { 
      id: 3, 
      title: 'City Hotel Room', 
      owner: 'Sarah Davis', 
      status: 'Rejected', 
      location: 'Delhi', 
      price: '₹3000',
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400'
      ]
    }
  ]);

  useEffect(() => {
    const handleAdminAction = (event) => {
      const action = event.detail;
      showToast(`Admin action: ${action.type}`, 'info');
    };
    
    window.addEventListener('adminAction', handleAdminAction);
    return () => window.removeEventListener('adminAction', handleAdminAction);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleViewUserDetails = (userId) => {
    // Find user from local users array first
    const localUser = users.find(u => u.id === userId);
    if (localUser) {
      // Try to find matching user in mockUsers by email
      const mockUser = mockUsers.find(u => u.email === localUser.email);
      // Use mockUser data if available, otherwise use localUser
      const userToShow = mockUser || {
        ...localUser,
        role: localUser.type === 'Host' ? 'property_owner' : 'user'
      };
      setSelectedUser(userToShow);
      setShowUserDetails(true);
    }
  };

  const handleCloseUserDetails = () => {
    setSelectedUser(null);
    setShowUserDetails(false);
  };

  const handleViewPropertyImages = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setShowPropertyImages(true);
    }
  };

  const handleClosePropertyImages = () => {
    setSelectedProperty(null);
    setShowPropertyImages(false);
  };

  const toggleUserStatus = (userId) => {
    const user = users.find(u => u.id === userId);
    const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    dataStore.updateUserStatus(user.email, newStatus);
    showToast(`User ${user.name} ${newStatus}`);
  };

  const updatePropertyStatus = (propertyId, newStatus) => {
    const property = properties.find(p => p.id === propertyId);
    setProperties(properties.map(p => p.id === propertyId ? { ...p, status: newStatus } : p));
    dataStore.updatePropertyStatus(propertyId, newStatus);
    showToast(`Property ${newStatus}`);
  };

  const deleteProperty = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    setProperties(properties.filter(p => p.id !== propertyId));
    dataStore.deleteProperty(propertyId);
    showToast(`Property deleted`, 'warning');
  };

  return (
    <>
      <div className="container py-4">
        <h1 className="fw-bold mb-4">Admin Dashboard</h1>
        
        {/* Navigation Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              User Management
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'properties' ? 'active' : ''}`}
              onClick={() => setActiveTab('properties')}
            >
              Property Management
            </button>
          </li>
        </ul>

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h3 className="fw-bold mb-0">All Users</h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td className="fw-semibold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.type === 'Host' ? 'bg-primary' : 'bg-secondary'}`}>
                            {user.type}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>{user.joinDate}</td>
                        <td>
                          <button 
                            className={`btn btn-sm ${user.status === 'Active' ? 'btn-danger' : 'btn-success'} me-2`}
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'Active' ? 'Block' : 'Unblock'}
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleViewUserDetails(user.id)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Property Management Tab */}
        {activeTab === 'properties' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h3 className="fw-bold mb-0">All Properties</h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Property Title</th>
                      <th>Owner</th>
                      <th>Location</th>
                      <th>Price/Night</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(property => (
                      <tr key={property.id}>
                        <td className="fw-semibold">
                          <button 
                            className="btn btn-link p-0 text-start fw-semibold text-decoration-none"
                            onClick={() => handleViewPropertyImages(property.id)}
                            style={{color: '#0d6efd'}}
                          >
                            {property.title}
                          </button>
                        </td>
                        <td>{property.owner}</td>
                        <td>{property.location}</td>
                        <td>{property.price}</td>
                        <td>
                          <span className={`badge ${
                            property.status === 'Approved' ? 'bg-success' : 
                            property.status === 'Pending' ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                        <td>
                          {property.status === 'Pending' && (
                            <>
                              <button 
                                className="btn btn-sm btn-success me-2"
                                onClick={() => updatePropertyStatus(property.id, 'Approved')}
                              >
                                Approve
                              </button>
                              <button 
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => updatePropertyStatus(property.id, 'Rejected')}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteProperty(property.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{borderRadius: '16px'}}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">User Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseUserDetails}></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-4 text-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" 
                         style={{width: '80px', height: '80px', fontSize: '24px', fontWeight: 'bold'}}>
                      {selectedUser.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                    </div>
                    <h5 className="fw-bold">{selectedUser.name}</h5>
                    <p className="text-muted">{selectedUser.email}</p>
                  </div>
                  <div className="col-md-8">
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="bg-light rounded p-3">
                          <label className="form-label text-muted small">Role</label>
                          <p className="fw-semibold mb-0">{selectedUser.role === 'property_owner' ? 'Property Owner' : selectedUser.role === 'admin' ? 'Admin' : 'Guest'}</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light rounded p-3">
                          <label className="form-label text-muted small">Gender</label>
                          <p className="fw-semibold mb-0">{selectedUser.gender || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light rounded p-3">
                          <label className="form-label text-muted small">Age</label>
                          <p className="fw-semibold mb-0">{selectedUser.age || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light rounded p-3">
                          <label className="form-label text-muted small">Status</label>
                          <span className={`badge ${users.find(u => u.email === selectedUser.email)?.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                            {users.find(u => u.email === selectedUser.email)?.status || 'Active'}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="bg-light rounded p-3">
                          <label className="form-label text-muted small">Join Date</label>
                          <p className="fw-semibold mb-0">{users.find(u => u.email === selectedUser.email)?.joinDate || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary" onClick={handleCloseUserDetails}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Property Images Modal */}
      {showPropertyImages && selectedProperty && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content" style={{borderRadius: '16px'}}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">{selectedProperty.title} - Images</h5>
                <button type="button" className="btn-close" onClick={handleClosePropertyImages}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {selectedProperty.images?.map((image, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card border-0 shadow-sm">
                        <img 
                          src={image} 
                          alt={`${selectedProperty.title} ${index + 1}`}
                          className="card-img-top"
                          style={{height: '250px', objectFit: 'cover', borderRadius: '8px 8px 0 0'}}
                        />
                        <div className="card-body p-2 text-center">
                          <small className="text-muted">Image {index + 1}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {(!selectedProperty.images || selectedProperty.images.length === 0) && (
                  <div className="text-center py-5">
                    <i className="fas fa-image text-muted fs-1 mb-3"></i>
                    <p className="text-muted">No images available for this property</p>
                  </div>
                )}
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary" onClick={handleClosePropertyImages}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: '', type: 'success' })}
      />
    </>
  );
};

export default AdminDashboard;