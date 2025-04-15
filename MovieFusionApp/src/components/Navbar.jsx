import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      setUser(AuthService.getCurrentAccount());
    };

    updateUser(); // Initial load
    window.addEventListener('userChanged', updateUser); // listen for login/logout

    return () => {
      window.removeEventListener('userChanged', updateUser); // cleanup
    };
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  };

  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3 ">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>🎬 Movie Fusion</Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className='mx-auto'>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={closeNavbar}>Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/movies" onClick={closeNavbar}>Movies</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/search" onClick={closeNavbar}>Search</NavLink>
              </li>

              {/* Admin Dashboard */}
              {user?.user_role_name === 'Admin' && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/dashboard" data-disabled="true" onClick={closeNavbar}>Dashboard</NavLink>
                </li>
              )}

              {/* Movie WatchList */}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/movie/watchlist" onClick={closeNavbar}>WatchList</NavLink>
                </li>
              )}

              {/* Movie Recommendation */}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/movie/recommendation" onClick={closeNavbar}>Recommended Movies</NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={closeNavbar}>About us</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>Contact</NavLink>
              </li>

            </ul>
          </div>

          {/* Right Side */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Notification Icon */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/notifications" title="Notifications" onClick={closeNavbar}>🔔</Link>
              </li>
            )}

            {/* If no user is logged in */}
            {!user && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/login" onClick={closeNavbar}>User Login</Link></li>
                  <li><Link className="dropdown-item" to="/register" onClick={closeNavbar}>User Register</Link></li>
                  <li><Link className="dropdown-item" to="/admin/login" onClick={closeNavbar}>Admin Login</Link></li>

                  <li><Link className="dropdown-item dropdown-item disabled" to="/admin/register" onClick={closeNavbar}>Admin Register</Link></li>


                </ul>
              </li>
            )}

            {/* If user is logged in */}
            {user && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.user_name}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile" onClick={closeNavbar}>Profile</Link></li>
                  <li><Link className="dropdown-item" to="/settings" onClick={closeNavbar}>Settings</Link></li>
                  <li><button className="dropdown-item" onClick={() => { handleLogout(); closeNavbar(); }}>Logout</button></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
