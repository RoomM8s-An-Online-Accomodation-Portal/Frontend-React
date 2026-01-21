import React, { useState, useEffect } from "react";
import { AUTH_EVENTS, authUtils } from "../../utils/auth";
import LoginStep from "./LoginStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import BookingInfoCard from "./BookingInfoCard";
import Login from "../Login/Login";

const ConfirmBooking = ({ bookings = [], onBack = () => {} }) => {
  /* ================ STATE ================ */
  const [isAuthenticated, setIsAuthenticated] = useState(authUtils.isAuthenticated());
  const [showLogin, setShowLogin] = useState(false);

  /* ================ EFFECTS ================ */
  useEffect(() => {
    const handleLogout = () => {
      setIsAuthenticated(false);
    };

    const handleLogin = () => {
      setIsAuthenticated(true);
    };

    // Listen for global auth events
    window.addEventListener(AUTH_EVENTS.LOGOUT, handleLogout);
    window.addEventListener(AUTH_EVENTS.LOGIN, handleLogin);

    return () => {
      window.removeEventListener(AUTH_EVENTS.LOGOUT, handleLogout);
      window.removeEventListener(AUTH_EVENTS.LOGIN, handleLogin);
    };
  }, []);

  /* ================ HANDLERS ================ */
  const handleNavigateToLogin = () => {
    localStorage.setItem('pendingBookings', JSON.stringify(bookings));
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleBackFromLogin = () => {
    setShowLogin(false);
  };

  /* ================ EARLY RETURN ================ */
  if (showLogin) {
    return <Login onLoginSuccess={handleLoginSuccess} onBack={handleBackFromLogin} />;
  }
  
  /* ================ UI ================ */
  return (
    <div className="container py-4">
      <div className="row">
        {/* Left Column - Steps */}
        <div className="col-lg-7">
          <div className="mb-4">
            <button 
              onClick={onBack}
              className="btn btn-link p-0 text-decoration-none"
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to listings
            </button>
          </div>

          <h2 className="mb-4 fw-bold">Confirm and pay</h2>

          {/* Conditional Step Rendering */}
          {!isAuthenticated ? (
            <LoginStep onNavigateToLogin={handleNavigateToLogin} />
          ) : (
            <>
              <PaymentStep />
              <ReviewStep bookings={bookings} />
            </>
          )}
        </div>

        {/* Right Column - Booking Info Card */}
        <div className="col-lg-5">
          <div className="sticky-content">
            <BookingInfoCard bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
