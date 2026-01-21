import React from "react";

const PaymentStep = () => {
  /* ================ STYLES ================ */
  const styles = {
    card: {
      borderRadius: '16px'
    },
    stepNumber: {
      width: '32px', 
      height: '32px', 
      fontSize: '14px'
    }
  };

  /* ================ UI ================ */
  return (
    <div className="card border-0 shadow-sm mb-4" style={styles.card}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
               style={styles.stepNumber}>
            2
          </div>
          <h5 className="mb-0 fw-bold">Add a payment method</h5>
        </div>

        <div className="mb-3">
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-outline-secondary flex-fill py-2">
              <i className="fab fa-cc-visa me-2"></i>
              Card
            </button>
            <button className="btn btn-outline-secondary flex-fill py-2">
              <i className="fab fa-paypal me-2"></i>
              PayPal
            </button>
            <button className="btn btn-outline-secondary flex-fill py-2">
              <i className="fas fa-university me-2"></i>
              UPI
            </button>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Card number</label>
            <input type="text" className="form-control" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="col-6">
            <label className="form-label">Expiry</label>
            <input type="text" className="form-control" placeholder="MM/YY" />
          </div>
          <div className="col-6">
            <label className="form-label">CVV</label>
            <input type="text" className="form-control" placeholder="123" />
          </div>
          <div className="col-12">
            <label className="form-label">Cardholder name</label>
            <input type="text" className="form-control" placeholder="Name on card" />
          </div>
        </div>

        <div className="bg-light rounded p-3 mt-3">
          <div className="d-flex align-items-center">
            <i className="fas fa-shield-alt text-success me-2"></i>
            <small className="text-muted">
              Your payment information is encrypted and secure
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
