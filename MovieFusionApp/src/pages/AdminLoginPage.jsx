import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentAccount();
    if (user && user.user_role_name === 'Admin') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Validate password (minimum 6 characters)
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      await AuthService.adminLogin({ email, password });

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to Movie Fusion, Admin!',
        timer: 1500,
        showConfirmButton: false,
        position: 'top',
        width: '300px',
        padding: '10px',
        toast: true,
        background: '#ffffff',
      });

      setEmail('');
      setPassword('');
      navigate('/admin/dashboard');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.message || 'Please check your email and password.',
        showConfirmButton: false,
        timer: 1500,
        position: 'top',
        width: '300px',
        padding: '10px',
        toast: true,
        background: '#ffffff',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 mt-4 p-2">
      <div
        className="card p-3 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '20px',
          background: '#ffffffee',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Icon"
            style={{ width: '60px', marginBottom: '10px' }}
          />
          <h2 className="fw-bold">Admin Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            {emailError && <small className="text-danger">{emailError}</small>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            {passwordError && <small className="text-danger">{passwordError}</small>}
          </div>
          <button className="btn btn-dark w-100 rounded-3" type="submit">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">
            Back to{' '}
            <a href="/" className="text-primary text-decoration-none">
              Homepage
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
