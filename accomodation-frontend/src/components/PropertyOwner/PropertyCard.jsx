import React from "react";

const PropertyCard = ({ 
  room, 
  onViewDetails = () => {}, 
  onDelete = () => {} 
}) => {
  /* ================ STYLES ================ */
  const styles = {
    card: {
      borderRadius: '25px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255,255,255,0.2)'
    },
    image: {
      height: '200px',
      objectFit: 'cover',
      borderRadius: '23px 23px 0 0',
      cursor: 'pointer'
    },
    cardBody: {
      cursor: 'pointer'
    },
    amenityBadge: {
      fontSize: '0.7rem'
    },
    overflowBadge: {
      fontSize: '0.7rem'
    }
  };

  /* ================ HANDLERS ================ */
  const handleViewDetails = () => {
    onViewDetails(room);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this property?')) {
      onDelete(room.id);
    }
  };

  /* ================ UI ================ */
  return (
    <div className="card h-100 border-0" style={styles.card}>
      <div className="position-relative">
        <img 
          src={room.image} 
          alt={room.title}
          className="card-img-top"
          style={styles.image}
          onClick={handleViewDetails}
        />
        
        <button
          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
          onClick={handleDeleteClick}
          title="Delete Property"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      
      <div className="card-body p-3" style={styles.cardBody} onClick={handleViewDetails}>
        <h6 className="card-title fw-bold mb-2">{room.title}</h6>
        
        <p className="text-muted small mb-2">
          <i className="fas fa-map-marker-alt me-1"></i>
          {room.location}
        </p>
        
        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-2">
            <div className="d-flex flex-wrap gap-1">
              {room.amenities.slice(0, 3).map((amenity, index) => (
                <span 
                  key={index} 
                  className="badge bg-light text-dark border" 
                  style={styles.amenityBadge}
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span 
                  className="badge bg-secondary" 
                  style={styles.overflowBadge}
                >
                  +{room.amenities.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">
            ₹{room.pricePerNight.toLocaleString()}/night
          </span>
          
          <div className="text-muted small">
            <i className="fas fa-star text-warning me-1"></i>
            {room.rating} ({room.reviews})
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
