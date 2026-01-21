import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { authUtils } from "../../utils/auth";
import { mockUsers } from "../../data/mockData";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthKey } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Extract inline styles to local style objects
  const cardStyle = { borderRadius: '16px' };
  const buttonStyle = { 
    background: 'linear-gradient(135deg, #ff385c, #e61e4d)', 
    border: 'none' 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      authUtils.login(user);
      setAuthKey(prev => prev + 1); // Trigger navbar re-render
      navigate('/'); // Navigate to home after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow" style={cardStyle}>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Welcome back</h3>
                <p className="text-muted">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger py-2 mb-3">
                    <small>{error}</small>
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@test.com, admin@test.com, or owner@test.com"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123456, admin, or owner123"
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3" 
                  style={buttonStyle}
                >
                  Sign In
                </button>
              </form>

              <button 
                onClick={handleBack} 
                className="btn btn-link w-100 text-decoration-none"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

