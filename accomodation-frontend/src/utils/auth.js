// Auth utility for global state management
export const AUTH_EVENTS = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout'
};

export const authUtils = {
  login: (userData) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userRole', userData.role || 'user');
    
    // Dispatch global event
    window.dispatchEvent(new CustomEvent(AUTH_EVENTS.LOGIN, { 
      detail: userData 
    }));
  },

  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('pendingBookings');
    
    // Dispatch global event
    window.dispatchEvent(new CustomEvent(AUTH_EVENTS.LOGOUT));
  },

  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  getUserRole: () => {
    return localStorage.getItem('userRole') || 'user';
  },

  hasRole: (role) => {
    return authUtils.getUserRole() === role;
  }
};