import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { authUtils } from "../../utils/auth";
import { mockUsers } from "../../data/mockData";
import Toast from "../Toast/Toast";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthKey } = useOutletContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("user");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  // Extract inline styles to local style objects
  const cardStyle = { borderRadius: '16px' };
  const buttonStyle = { 
    background: 'linear-gradient(135deg, #ff385c, #e61e4d)', 
    border: 'none' 
  };

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
      }
      
      if (mockUsers.find(u => u.email === email)) {
        showToast('Email already exists', 'error');
        return;
      }
      
      const newUser = {
        id: Date.now(),
        email,
        password,
        name: `${firstName} ${lastName}`,
        role,
        gender,
        age: parseInt(age)
      };
      
      mockUsers.push(newUser);
      authUtils.login(newUser);
      setAuthKey(prev => prev + 1);
      showToast('Account created successfully!', 'success');
      
      setTimeout(() => {
        const redirectPath = authUtils.getRedirectAfterLogin();
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          // Always redirect to home page for all users after signup
          navigate('/');
        }
      }, 1500);
    } else {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        authUtils.login(user);
        setAuthKey(prev => prev + 1);
        showToast('Login successful!', 'success');
        
        setTimeout(() => {
          const redirectPath = authUtils.getRedirectAfterLogin();
          if (redirectPath) {
            navigate(redirectPath);
          } else {
            // Always redirect to home page for all users after login
            navigate('/');
          }
        }, 1500);
      } else {
        showToast('Invalid email or password', 'error');
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="card border-0 shadow" style={cardStyle}>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h3 className="fw-bold">{isSignUp ? 'Create Account' : 'Welcome back'}</h3>
                <p className="text-muted">{isSignUp ? 'Sign up for a new account' : 'Sign in to your account'}</p>
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger py-2 mb-3">
                    <small>{error}</small>
                  </div>
                )}
                
                {isSignUp && (
                  <>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label">First Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Last Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isSignUp ? "Enter your email" : "user@test.com, admin@test.com, or owner@test.com"}
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignUp ? "Enter password" : "123456, admin, or owner123"}
                    required 
                  />
                </div>
                
                {isSignUp && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label">Role</label>
                        <select 
                          className="form-select" 
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="property_owner">Property Owner</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label">Gender</label>
                        <select 
                          className="form-select" 
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Age</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="18"
                        max="100"
                        required 
                      />
                    </div>
                  </>
                )}
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3" 
                  style={buttonStyle}
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>
              
              <div className="text-center mb-3">
                <button 
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="btn btn-link text-decoration-none p-0"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
              </div>

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
      
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: '', type: 'error' })}
      />
    </div>
  );
};

export default Login;

