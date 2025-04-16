import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaGithub, } from 'react-icons/fa';
// import logo from '../assets/logo.png'; // replace with actual logo path

const Footer = () => {

  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email.trim() !== '') {
      // Open Gmail in a new tab
      window.open('https://mail.google.com', '_blank');
    } else {
      alert('Please enter a valid email address.');
    }
  };


  return (
    <footer className="bg-dark text-white pt-5 pb-3 p-4">
      <div className="container">
        <div className="row text-start d-flex justify-content-center">
          {/* Logo + About */}
          <div className="col-md-4 mb-4">
            {/* <img src="#" alt="Movie Fusion Logo" style={{ width: '150px' }} className="mb-3" /> */}
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
          <div className="col-md-4 mb-4" style={{paddingLeft:"50px"}}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="/about" className="text-white text-decoration-none">About Us</NavLink></li>
              <li><NavLink to="/contact" className="text-white text-decoration-none">Contact</NavLink></li>
              <li><NavLink to="#" className="text-white text-decoration-none">FAQ</NavLink></li>
              <li><NavLink to="#" className="text-white text-decoration-none">Privacy Policy</NavLink></li>
            </ul>
          </div>

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
          <p className="">© {new Date().getFullYear()} Movie Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
