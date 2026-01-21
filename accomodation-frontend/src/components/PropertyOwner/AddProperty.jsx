import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { authUtils } from "../../utils/auth";

const AddProperty = () => {
  const navigate = useNavigate();
  const { handlePropertyAdded } = useOutletContext();
  const [formData, setFormData] = React.useState({
    title: '',
    location: '',
    pricePerNight: '',
    description: '',
    maxGuests: '',
    amenities: [],
    images: []
  });
  const [loading, setLoading] = React.useState(false);

  const amenitiesList = ['WiFi', 'AC', 'Kitchen', 'Pool', 'Parking', 'Gym', 'Balcony', 'TV'];

  // Extract inline styles to local style objects
  const cardStyle = { borderRadius: '12px' };
  const buttonStyle = {
    background: '#ff385c', 
    border: 'none', 
    borderRadius: '8px'
  };
  const imageStyle = { 
    height: '100px', 
    objectFit: 'cover', 
    width: '100%' 
  };

  const handleBack = () => {
    navigate('/property-dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProperty = {
        ...formData,
        pricePerNight: parseInt(formData.pricePerNight),
        maxGuests: parseInt(formData.maxGuests),
        ownerEmail: localStorage.getItem('userEmail'),
        image: formData.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        rating: 5.0,
        reviews: 0,
        nights: 1,
        checkIn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        checkOut: new Date(Date.now() + 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (handlePropertyAdded) handlePropertyAdded(newProperty);
      navigate('/property-dashboard');
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex align-items-center mb-4">
            <button className="btn btn-outline-secondary me-3" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <h2 className="fw-bold mb-0">Add New Property</h2>
          </div>

          <div className="card border-0 shadow-sm" style={cardStyle}>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Property Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Cozy Beach Villa"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Goa, India"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Price per Night (₹)</label>
                    <input
                      type="number"
                      name="pricePerNight"
                      className="form-control"
                      value={formData.pricePerNight}
                      onChange={handleInputChange}
                      placeholder="5000"
                      min="1"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Max Guests</label>
                    <input
                      type="number"
                      name="maxGuests"
                      className="form-control"
                      value={formData.maxGuests}
                      onChange={handleInputChange}
                      placeholder="4"
                      min="1"
                      max="20"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your property..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Amenities</label>
                  <div className="row">
                    {amenitiesList.map(amenity => (
                      <div key={amenity} className="col-md-3 col-6 mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                          />
                          <label className="form-check-label">{amenity}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Property Images</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {formData.images.length > 0 && (
                    <div className="row mt-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="col-md-3 col-6 mb-2">
                          <div className="position-relative">
                            <img
                              src={image}
                              alt={`Property ${index + 1}`}
                              className="img-fluid rounded"
                              style={imageStyle}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                              onClick={() => removeImage(index)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={handleBack}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 fw-semibold"
                    style={buttonStyle}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Adding Property...
                      </>
                    ) : (
                      'Add Property'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
