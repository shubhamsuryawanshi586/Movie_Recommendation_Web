import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';

const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentAccount();
    if (user && user.user_role_name === 'User') {
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    let formErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation (basic regex check)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
      formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const loginData = { email, password };
      await AuthService.userLogin(loginData);

      await Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome to Movie Fusion`,
        timer: 1500,
        showConfirmButton: false,
        position: 'top',
        width: '400px',
        padding: '10px',
        toast: true,
        background: '#ffffff',
      });

      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Login error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your email and password.',
        timer: 1500,
        position: 'top',
        width: '300px',
        padding: '10px',
        toast: true,
        background: '#ffffff',
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 mt-3 p-2">
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
            alt="User Icon"
            style={{ width: '60px', marginBottom: '10px' }}
          />
          <h2 className="fw-bold">User Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <button className="btn btn-primary w-100 rounded-3" type="submit">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">
            Don't have an account?{' '}
            <a href="/register" className="text-primary text-decoration-none">
              Register
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
