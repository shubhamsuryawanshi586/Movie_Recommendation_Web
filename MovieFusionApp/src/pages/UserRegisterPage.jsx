import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';

const UserRegisterPage = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Email validation (basic format check)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.match(emailRegex)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Password validation (must include at least one lowercase letter, one uppercase letter, one number, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!formData.password.match(passwordRegex)) {
      setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submitting
    if (!validateForm()) {
      return;
    }

    const payload = { ...formData, user_role_id: 1 };
    try {
      await AuthService.userRegister(payload);
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        position: 'top',
        width: '300px',
        toast: true,
        background: '#ffffff',
        timer: 1500,
        text: 'Please login.',
        willClose: () => navigate('/login'),
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: err.response?.data?.message || 'Something went wrong!',
        position: 'top',
      });

      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-2">
      <div
        className="card p-3 shadow-lg"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '20px',
          background: '#ffffffee',
        }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User Icon"
            style={{ width: '60px', marginBottom: '10px' }}
          />
          <h2 className="fw-bold">User Registration</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control rounded-3"
              name="user_name"
              placeholder="Name"
              value={formData.user_name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control rounded-3"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            {emailError && <small className="text-danger">{emailError}</small>}
          </div>
          <div className="mb-4">
            <input
              className="form-control rounded-3"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {passwordError && <small className="text-danger">{passwordError}</small>}
          </div>
          <button className="btn btn-primary w-100 rounded-3" type="submit">
            Register as User
          </button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary text-decoration-none">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
