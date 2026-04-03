import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchValue);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <i className="bi bi-music-note-beamed" style={{ fontSize: '1.5rem', color: '#1db954' }}></i>
          <p>Geetanjali</p>
        </Link>

        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <div style={{ position: 'relative' }}>
            <i 
              className="bi bi-search" 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'rgba(255,255,255,0.5)',
                fontSize: '14px'
              }}
            ></i>
            <input
              type="text"
              name="search"
              placeholder="Search songs, artists, albums..."
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="form-control rounded-pill search-bar"
            />
          </div>
        </div>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex align-items-center ms-auto gap-1">
            <Link 
              to="/" 
              className="nav-link text-white"
              style={isActive('/') ? { background: 'rgba(255,255,255,0.1)', color: '#1db954' } : {}}
            >
              <i className="bi bi-house-door me-1"></i>
              Home
            </Link>
            <Link 
              to="/albums" 
              className="nav-link text-white"
              style={isActive('/albums') ? { background: 'rgba(255,255,255,0.1)', color: '#1db954' } : {}}
            >
              <i className="bi bi-collection me-1"></i>
              Albums
            </Link>
            <Link 
              to="/artists" 
              className="nav-link text-white"
              style={isActive('/artists') ? { background: 'rgba(255,255,255,0.1)', color: '#1db954' } : {}}
            >
              <i className="bi bi-people me-1"></i>
              Artists
            </Link>
            <Link to="/add-song">
              <button className="btn add-song-btn ms-2">
                <i className="bi bi-plus-lg me-1"></i>
                Add Song
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
