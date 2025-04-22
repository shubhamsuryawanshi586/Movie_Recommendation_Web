import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './css/NavBar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const navRef = useRef(); //  this effect to close navbar when clicking outside
  useEffect(() => {

    const handleClickOutside = (event) => {
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      if (
        navbarCollapse &&
        navbarCollapse.classList.contains('show') &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
    <div className='main'>
      <nav ref={navRef} className="main-navbar navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3 " >
        <div className="container-fluid" >
          {/* Brand */}
          {/* <Link className="navbar-brand" to="/" onClick={closeNavbar}><span style={{ color: 'orange' }}>M</span>ovie <span style={{ color: 'orange' }}>F</span>usion
          </Link> */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeNavbar}>
            <img src="/images/tv.png" alt="Movie Fusion Logo" style={{ height: '20px' }} />
            <span><span style={{ color: 'orange' }}>M</span>ovie <span style={{ color: 'orange' }}>F</span>usion</span>
          </Link>


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

                {/* Admin Dashboard */}
                {user?.user_role_name === 'Admin' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/dashboard" onClick={closeNavbar}>Dashboard</NavLink>
                  </li>
                )}

                {/* Movie WatchList */}
                {user && user?.user_role_name !== 'Admin' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/movie/watchlist" onClick={closeNavbar}>WatchList</NavLink>
                  </li>
                )}

                {/* Movie Recommendation */}
                {user && user?.user_role_name !== 'Admin' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/movie/recommendation" onClick={closeNavbar}>Recommended Movies</NavLink>
                  </li>
                )}

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                  <div className="searchbar-container">
                    <div className='searchbar'>
                      <form className="d-flex my-0" onSubmit={handleSearchSubmit}>
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder="Search movies..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value.trimStart())}
                        />
                        <button onClick={() => { closeNavbar(); window.scrollTo(0, 0); }} className="btn btn-primary" type="submit">Search</button>

                      </form>
                    </div>
                  </div>

                </ul>
              </ul>


            </div>



            {/* Right Side */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Notification Icon */}
              {/* {user && (
                <li className="nav-item">
                  <Link className="nav-link disabled" to="/footer" title="Notifications" onClick={closeNavbar}>🔔</Link>
                </li>
              )} */}

              {/* If no user is logged in */}
              {!user && (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Login
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/login" onClick={closeNavbar}>User Login</Link></li>
                    <li><Link className="dropdown-item" to="/register" onClick={closeNavbar}>User Register</Link></li>
                    <li><Link className="dropdown-item" to="/admin/login" onClick={closeNavbar}>Admin Login</Link></li>
                    {(user?.user_role_name === 'Admin' &&
                      <li><Link className="dropdown-item dropdown-item disabled" to="/admin/register" onClick={closeNavbar}>Admin Register</Link></li>
                    )}

                  </ul>
                </li>
              )}

              {/* If user is logged in */}
              {user && (
                <li className="nav-item dropdown">
                  <Link className="nav-link d-flex align-items-center gap-2" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                    <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                      style={{ width: '32px', height: '32px' }}> {user.user_name.charAt(0).toUpperCase()}
                    </div>

                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/profile" onClick={closeNavbar}>Profile</Link></li>
                    <li><Link className="dropdown-item" to="/#" onClick={closeNavbar}>Settings</Link></li>
                    <li>
                      <button className="dropdown-item" onClick={() => { handleLogout(); closeNavbar(); }}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
