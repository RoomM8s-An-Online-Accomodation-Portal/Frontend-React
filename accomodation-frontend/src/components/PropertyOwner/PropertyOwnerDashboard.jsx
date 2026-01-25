import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import PropertyDetails from "./PropertyDetails";
import EditProperty from "./EditProperty";
import { authUtils } from "../../utils/auth";
import { dataStore } from "../../utils/dataStore";

const PropertyOwnerDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Extract inline styles to local style objects
  const buttonStyle = {
    background: '#ff385c',
    border: 'none',
    borderRadius: '8px'
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const ownerProperties = dataStore.getOwnerRooms(userEmail);
    setProperties(ownerProperties);

    const unsubscribe = dataStore.subscribe(() => {
      const updatedProperties = dataStore.getOwnerRooms(userEmail);
      setProperties(updatedProperties);
    });

    return unsubscribe;
  }, []);

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleDeleteProperty = (propertyId) => {
    dataStore.removeRoom(propertyId);
  };

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRoom(null);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowEdit(true);
  };

  const handleSaveEdit = (updatedProperty) => {
    dataStore.updateRoom(updatedProperty.id, updatedProperty);
    setShowEdit(false);
    setEditingProperty(null);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setEditingProperty(null);
  };

  return (
    <>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={handleBack}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div>
              <h2 className="fw-bold mb-1">My Properties</h2>
              <p className="text-muted mb-0">Manage your listed properties</p>
            </div>
          </div>
          <button
            className="btn btn-primary px-4 py-2 fw-semibold"
            style={buttonStyle}
            onClick={handleAddProperty}
          >
            <i className="fas fa-plus me-2"></i>
            Add Property
          </button>
        </div>

        <div className="row g-4">
          {properties.map((property) => (
            <div key={property.id} className="col-md-4 col-lg-3">
              <PropertyCard
                room={property}
                onViewDetails={handleViewDetails}
                onDelete={handleDeleteProperty}
                onEdit={handleEditProperty}
              />
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-home fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">No Properties Listed</h4>
            <p className="text-muted">Start by adding your first property</p>
            <button
              className="btn btn-primary px-4 py-2 fw-semibold"
              style={buttonStyle}
              onClick={handleAddProperty}
            >
              <i className="fas fa-plus me-2"></i>
              Add Your First Property
            </button>
          </div>
        )}
      </div>

      <PropertyDetails
        property={selectedRoom}
        show={showDetails}
        onClose={handleCloseDetails}
      />

      {showEdit && editingProperty && (
        <EditProperty
          property={editingProperty}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default PropertyOwnerDashboard;
