// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f5f7fa' }} className="border-top">
      <div className="container py-5">
        <div className="row g-4">
          {/* Column 1: Company */}
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-decoration-none text-dark d-block mb-2 hover-red">About</a></li>
              <li><a href="#careers" className="text-decoration-none text-dark d-block mb-2 hover-red">Careers</a></li>
              <li><a href="#press" className="text-decoration-none text-dark d-block mb-2 hover-red">Press</a></li>
              <li><a href="#blog" className="text-decoration-none text-dark d-block mb-2 hover-red">Blog</a></li>
              <li><a href="#events" className="text-decoration-none text-dark d-block mb-2 hover-red">Events</a></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#help" className="text-decoration-none text-dark d-block mb-2 hover-red">Help Center</a></li>
              <li><a href="#safety" className="text-decoration-none text-dark d-block mb-2 hover-red">Safety</a></li>
              <li><a href="#trust" className="text-decoration-none text-dark d-block mb-2 hover-red">Trust & Safety</a></li>
              <li><a href="#contact" className="text-decoration-none text-dark d-block mb-2 hover-red">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">Community</h5>
            <ul className="list-unstyled">
              <li><a href="#diversity" className="text-decoration-none text-dark d-block mb-2 hover-red">Diversity & Belonging</a></li>
              <li><a href="#accessibility" className="text-decoration-none text-dark d-block mb-2 hover-red">Accessibility</a></li>
              <li><a href="#neighborhoods" className="text-decoration-none text-dark d-block mb-2 hover-red">Neighborhoods</a></li>
              <li><a href="#host" className="text-decoration-none text-dark d-block mb-2 hover-red">Become a Host</a></li>
            </ul>
          </div>

          {/* Column 4: Hosting */}
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">Hosting</h5>
            <ul className="list-unstyled">
              <li><a href="#responsible-hosting" className="text-decoration-none text-dark d-block mb-2 hover-red">Responsible Hosting</a></li>
              <li><a href="#resources" className="text-decoration-none text-dark d-block mb-2 hover-red">Resources</a></li>
              <li><a href="#community-center" className="text-decoration-none text-dark d-block mb-2 hover-red">Community Center</a></li>
              <li><a href="#host-support" className="text-decoration-none text-dark d-block mb-2 hover-red">Host Support</a></li>
            </ul>
          </div>

          {/* Column 5: Legal + Social + Lang/Currency */}
          <div className="col-10 mt-4 pt-4 border-top border-secondary-subtle">
            <div className="row">
              <div className="col-md-4">
                {/* <h5 className="fw-bold mb-3">Legal</h5>
                <ul className="list-unstyled d-flex flex-wrap gap-3 mb-4">
                  <li><a href="#terms" className="text-decoration-none text-dark hover-red">Terms</a></li>
                  <li><a href="#privacy" className="text-decoration-none text-dark hover-red">Privacy</a></li>
                  <li><a href="#cookies" className="text-decoration-none text-dark hover-red">Cookies</a></li>
                  <li><a href="#sitemap" className="text-decoration-none text-dark hover-red">Sitemap</a></li>
                </ul> */}

                {/* Social Icons */}
                <div className="d-flex gap-4 mb-1">
                  <a href="#facebook" aria-label="Facebook" className="text-dark fs-5 hover-red"><i className="fab fa-facebook-f"></i></a>
                  <a href="#twitter" aria-label="Twitter" className="text-dark fs-5 hover-red"><i className="fab fa-twitter"></i></a>
                  <a href="#instagram" aria-label="Instagram" className="text-dark fs-5 hover-red"><i className="fab fa-instagram"></i></a>
                  <a href="#youtube" aria-label="YouTube" className="text-dark fs-5 hover-red"><i className="fab fa-youtube"></i></a>
                </div>
              </div>

              {/* <div className="col-md-6 d-flex flex-column align-items-md-end">
                <div className="d-flex gap-2 mb-3">
                  <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                    <option>English (US)</option>
                    <option>Español</option>
                    <option>Français</option>
                  </select>
                  <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                    <option>$ USD</option>
                    <option>€ EUR</option>
                    <option>£ GBP</option>
                  </select>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-top py-3 text-center text-muted small">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0">&copy; {new Date().getFullYear()} RoomMates, Inc. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#terms" className="text-decoration-none text-muted hover-red">Terms</a>
            <a href="#privacy" className="text-decoration-none text-muted hover-red">Privacy</a>
            <a href="#sitemap" className="text-decoration-none text-muted hover-red">Sitemap</a>
            <a href="#help" className="text-decoration-none text-muted hover-red">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;