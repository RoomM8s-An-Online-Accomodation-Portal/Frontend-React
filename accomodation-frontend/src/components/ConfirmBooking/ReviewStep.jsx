import React from "react";

const ReviewStep = ({ booking = {} }) => {
  /* ================ STYLES ================ */
  const styles = {
    card: {
      borderRadius: '16px'
    },
    stepNumber: {
      width: '32px', 
      height: '32px', 
      fontSize: '14px'
    },
    confirmButton: {
      background: 'linear-gradient(135deg, #ff385c, #e61e4d)', 
      border: 'none'
    }
  };

  /* ================ UI ================ */
  return (
    <div className="card border-0 shadow-sm mb-4" style={styles.card}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
               style={styles.stepNumber}>
            3
          </div>
          <h5 className="mb-0 fw-bold">Review your reservation</h5>
        </div>

        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Cancellation policy</h6>
          <div className="bg-light rounded p-3">
            <p className="mb-2">
              <strong>Free cancellation before 48 hours</strong>
            </p>
            <p className="text-muted small mb-0">
              Cancel at least 48 hours before check-in on {booking?.checkIn} for a full refund. 
              Cancellations made less than 48 hours before check-in are non-refundable.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Ground rules</h6>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center">
              <i className="fas fa-check text-success me-2"></i>
              <span className="small">Check-in after 3:00 PM</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-check text-success me-2"></i>
              <span className="small">Check-out before 11:00 AM</span>
            </div>
          </div>
        </div>

        <div className="form-check mb-4">
          <input className="form-check-input" type="checkbox" id="agreeTerms" />
          <label className="form-check-label small" htmlFor="agreeTerms">
            I agree to the Host's House Rules, RoomM8's Rebooking and Refund Policy, 
            and that Airbnb can charge my payment method if I'm responsible for damage.
          </label>
        </div>

        <button 
          className="btn btn-primary w-100 py-3 fw-bold fs-5"
          style={styles.confirmButton}
        >
          <i className="fas fa-lock me-2"></i>
          Confirm and pay
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;

