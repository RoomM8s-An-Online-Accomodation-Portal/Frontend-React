import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', type: 'Guest', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', type: 'Host', status: 'Active', joinDate: '2024-02-10' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', type: 'Guest', status: 'Blocked', joinDate: '2024-01-20' }
  ]);

  const [properties, setProperties] = useState([
    { id: 1, title: 'Cozy Apartment', owner: 'Jane Smith', status: 'Approved', location: 'Mumbai', price: '₹2500' },
    { id: 2, title: 'Beach Villa', owner: 'Alex Brown', status: 'Pending', location: 'Goa', price: '₹5000' },
    { id: 3, title: 'City Hotel Room', owner: 'Sarah Davis', status: 'Rejected', location: 'Delhi', price: '₹3000' }
  ]);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' }
        : user
    ));
  };

  const updatePropertyStatus = (propertyId, newStatus) => {
    setProperties(properties.map(property => 
      property.id === propertyId 
        ? { ...property, status: newStatus }
        : property
    ));
  };

  const deleteProperty = (propertyId) => {
    setProperties(properties.filter(property => property.id !== propertyId));
  };

  return (
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
                        <button className="btn btn-sm btn-outline-primary">
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
                      <td className="fw-semibold">{property.title}</td>
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
  );
};

export default AdminDashboard;