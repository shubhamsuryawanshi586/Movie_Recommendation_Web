import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setLoggedIn(!!userString);
  }, []);

  return (
    <footer className="main-footer text-white pt-3 pb-3">
      <div className="container d-flex justify-content-between align-items-center">

        <div className="center-section">
          <h5 className="footer-heading">Quick Links</h5>
          <ul className="footer-links list-inline">
            {!loggedIn && (
              <>
                <li className="list-inline-item"><NavLink to="/register" className="footer-link">User Register</NavLink></li>
                <li className="list-inline-item"><NavLink to="/login" className="footer-link">User Login</NavLink></li>
              </>
            )}
            <li className="list-inline-item"><NavLink to="/" className="footer-link">Home</NavLink></li>
            <li className="list-inline-item"><NavLink to="/movies" className="footer-link">Movies</NavLink></li>
            <li className="list-inline-item"><NavLink to="/about" className="footer-link">About Us</NavLink></li>
            <li className="list-inline-item"><NavLink to="/contact" className="footer-link">Contact Us</NavLink></li>
          </ul>
        </div>

        <div className="right-section">
        <h5 className="footer-heading">Social Links</h5>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center">
        <p>© {new Date().getFullYear()} Movie Fusion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
