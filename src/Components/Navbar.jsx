import React from 'react';
import { Link } from 'react-router-dom'; // Optional if using React Router

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* Logo Section */}
        <a href="/" className="navbar-brand">
          <img
            src="/src/assets/Logo.png"
            alt="Logo"
            className="d-inline-block align-text-top"
            style={{ height: '70px', cursor: 'pointer' }}
          />
        </a>

        {/* Toggler Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="./Fav" className="nav-link">
                Favorite
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
