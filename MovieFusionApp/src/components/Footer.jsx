import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 ">
      <p>© {new Date().getFullYear()} Movie Fusion. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
