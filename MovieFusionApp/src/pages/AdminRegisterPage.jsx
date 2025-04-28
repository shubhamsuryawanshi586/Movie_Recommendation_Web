import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Swal from 'sweetalert2';

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    adminname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    adminname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = { adminname: '', email: '', password: '' };
    let isValid = true;

    // Validate username (not empty and only letters and spaces allowed)
    if (!formData.adminname.trim()) {
      formErrors.adminname = 'Username is required';
      isValid = false;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.match(emailRegex)) {
      formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password length (min 6 characters)
    if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    const payload = {
      admin_name: formData.adminname,
      email: formData.email,
      password: formData.password,
      userRoleId: 2, // Assuming 2 is the admin role ID
    };

    try {
      await AuthService.adminRegister(payload);

      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Admin registered successfully. Please login.',
        position: 'top',
        width: '300px',
        toast: true,
        background: '#ffffff',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate('/admin/login');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'There was an issue with your registration. Please try again.',
        position: 'top',
        width: '300px',
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
          maxWidth: '450px',
          borderRadius: '20px',
          background: '#ffffffee',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="text-center mb-4">
          {/* Registration Icon */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Register Icon"
            style={{ width: '60px', marginBottom: '10px' }}
          />
          <h2 className="fw-bold">Admin Registration</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control rounded-3"
              name="adminname"
              placeholder="Admin Username"
              value={formData.adminname}
              onChange={handleChange}
              required
              autoComplete="username"
            />
            {errors.adminname && (
              <small className="text-danger">{errors.adminname}</small>
            )}
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
            {errors.email && <small className="text-danger">{errors.email}</small>}
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
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <button className="btn btn-danger w-100 rounded-3" type="submit">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account?{' '}
            <a href="/admin/login" className="text-primary text-decoration-none">
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
