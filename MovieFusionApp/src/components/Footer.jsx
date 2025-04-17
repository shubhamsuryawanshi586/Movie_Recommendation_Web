import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa';
import './css/Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);  // You can replace this with your actual auth logic

   useEffect(() => {
      const userString = localStorage.getItem('user');
      setLoggedIn(!!userString);
    }, []);

  const handleSubscribe = () => {
    if (email.trim() !== '') {
      window.open('https://mail.google.com', '_blank');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <footer className="main-footer text-white pt-5 pb-3 p-4">
      <div className="container">
        <div className="row text-start d-flex justify-content-center">
          <div className="col-md-4 mb-4">
            <p className="text-wrap text-break">
              Movie Fusion is your source for discovering great films and timeless classics. Dive into a world of cinema with us.
            </p>
            {/* Social Icons */}
            <div className="d-flex mt-3">
              <a href="https://facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://youtube.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://github.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {!loggedIn && (
                <>
                  <li><NavLink to="/register" className="text-white" onClick={() => window.scrollTo(0, 0)}>User Register</NavLink></li>
                  <li><NavLink to="/login" className="text-white" onClick={() => window.scrollTo(0, 0)}>User Login</NavLink></li>
                </>
              )}
              <li><NavLink to="/" className="text-white" onClick={() => window.scrollTo(0, 0)}>Home</NavLink></li>
              <li><NavLink to="/movies" className="text-white" onClick={() => window.scrollTo(0, 0)}>Movies</NavLink></li>
              <li><NavLink to="/about" className="text-white" onClick={() => window.scrollTo(0, 0)} >About us</NavLink></li>
              <li><NavLink to="/contact" className="text-white" onClick={() => window.scrollTo(0, 0)}>Contact us</NavLink></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="col-md-4">
            <h5>Stay Updated</h5>
            <p>Subscribe to our newsletter to get the latest movie picks and updates.</p>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-warning fw-medium" onClick={handleSubscribe}>
              Reach to us
            </button>
            <small className="text-muted d-block mt-2">
              We'll never spam you. Please check your Gmail after subscribing.
            </small>
          </div>
        </div>

        {/* Copyright */}
        <div className="mb-2">
          <p>© {new Date().getFullYear()} Movie Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
