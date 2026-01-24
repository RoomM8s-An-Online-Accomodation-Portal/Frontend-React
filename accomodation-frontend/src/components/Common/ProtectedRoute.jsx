import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authUtils } from '../../utils/auth';

const ProtectedRoute = ({ children, requiredRole, redirectTo = '/login' }) => {
  const location = useLocation();
  const isAuthenticated = authUtils.isAuthenticated();
  const userRole = authUtils.getUserRole();

  // If not authenticated, redirect to login with current path
  if (!isAuthenticated) {
    authUtils.setRedirectAfterLogin(location.pathname);
    return <Navigate to={redirectTo} replace />;
  }

  // If authenticated but wrong role, show access denied
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-5">
                <i className="fas fa-lock text-danger fs-1 mb-3"></i>
                <h3 className="fw-bold mb-3">Access Denied</h3>
                <p className="text-muted mb-4">
                  You need to be a {requiredRole.replace('_', ' ')} to access this page.
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      authUtils.logout();
                      window.location.href = '/login';
                    }}
                  >
                    Login as {requiredRole.replace('_', ' ')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;