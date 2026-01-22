import React, { useState, useEffect, useRef } from "react";
import { authUtils } from "../../utils/auth";

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return '';
  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const Navbar = ({
  onSearch = () => {},
  onClearSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  onHelpClick = () => {},
  onPropertyOwnerClick = () => {},
  showSearch = true
}) => {
  /* ================ STATE ================ */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);

  /* ================ EFFECTS ================ */
  useEffect(() => {
    setIsAuthenticated(authUtils.isAuthenticated());
    if (authUtils.isAuthenticated()) {
      setUserName(localStorage.getItem('userName') || '');
    }

    const handleAuthChange = () => {
      setIsAuthenticated(authUtils.isAuthenticated());
      if (authUtils.isAuthenticated()) {
        setUserName(localStorage.getItem('userName') || '');
      } else {
        setUserName('');
      }
    };

    window.addEventListener('auth:login', handleAuthChange);
    window.addEventListener('auth:logout', handleAuthChange);

    return () => {
      window.removeEventListener('auth:login', handleAuthChange);
      window.removeEventListener('auth:logout', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          console.log('Scroll detected:', window.scrollY, 'isScrolled:', scrolled);
          setIsScrolled(scrolled);
          // Keep search bar always visible when showSearch is true
          if (showSearch) {
            setShowSearchBar(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClearSearchEvent = () => {
      setSearchQuery("");
    };

    window.addEventListener('clearSearch', handleClearSearchEvent);
    return () => window.removeEventListener('clearSearch', handleClearSearchEvent);
  }, []);

  /* ================ STYLES ================ */
  const styles = {
    nav: {
      position: 'sticky',
      top: 0,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      zIndex: 1020,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    dropdown: {
      minWidth: '200px',
      borderRadius: '12px',
      backgroundColor: '#334155',
      border: '1px solid #495057',
      zIndex: 1030
    }
  };

  /* ================ HANDLERS ================ */
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    authUtils.logout();
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    onLogoutClick();
  };

  const handlePropertyOwnerClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      handleLoginClick();
      return;
    }
    
    const userRole = authUtils.getUserRole();
    if (userRole !== 'property_owner') {
      alert('Access denied. Only property owners can access this section.');
      return;
    }
    
    onPropertyOwnerClick();
  };

  const handleLoginClick = () => {
    setIsDropdownOpen(false);
    onLoginClick();
  };

  const handleHelpClick = () => {
    setIsDropdownOpen(false);
    onHelpClick();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /* ================ UI ================ */
  return (
    <nav style={styles.nav}>
      {/* Top Row */}
      <div className={`container ${isScrolled ? 'py-1' : 'py-3'}`} style={{
        transition: 'padding 0.3s ease'
      }}>
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <h4 className="mb-0 fw-bold text-primary">
              <i className="fas fa-home me-2"></i>
              StayEase
            </h4>
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            {/* Property Owner Link */}
            <a 
              href="#" 
              className="text-decoration-none text-dark fw-semibold hover-link" 
              onClick={handlePropertyOwnerClick}
            >
              Property Owner
            </a>

            {/* User Dropdown */}
            <div className="position-relative" ref={dropdownRef}>
              <button
                className="btn btn-light border rounded-pill d-flex align-items-center px-3 py-2"
                onClick={handleDropdownToggle}
              >
                <i className="fas fa-bars me-2"></i>
                {isAuthenticated && userName ? (
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#007bff',
                      fontSize: '14px'
                    }}
                  >
                    {getInitials(userName)}
                  </div>
                ) : (
                  <i className="fas fa-user-circle fs-5"></i>
                )}
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu show position-absolute end-0 mt-2 shadow border" style={styles.dropdown}>
                  {!isAuthenticated ? (
                    <button className="dropdown-item py-2 text-white" onClick={handleLoginClick}>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Login / Sign Up
                    </button>
                  ) : (
                    <button className="dropdown-item py-2 text-white" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  )}
                  <hr className="dropdown-divider my-1" style={{borderColor: '#6c757d'}} />
                  <button className="dropdown-item py-2 text-white" onClick={handleHelpClick}>
                    <i className="fas fa-question-circle me-2"></i>
                    Help Center
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      {showSearch && (
        <div className="container pb-3">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSearch} className="d-flex">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-map-marker-alt text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by location"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                  <button className="btn btn-primary px-4" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                  {searchQuery && (
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={onClearSearch}
                      title="Clear search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hover-link:hover {
          color: #ff385c !important;
          transition: color 0.2s ease;
        }
        .dropdown-item:hover {
          background-color: #495057 !important;
          color: white !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
