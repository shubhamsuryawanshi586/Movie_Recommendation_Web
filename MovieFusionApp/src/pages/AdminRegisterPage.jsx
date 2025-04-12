import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    adminname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      admin_name: formData.adminname,
      email: formData.email,
      password: formData.password,
      userRoleId: 2, 
    };
    try {
      await AuthService.adminRegister(payload);
      alert('Admin registered successfully. Please login.');
      navigate('/admin/login');
    } catch (err) {
      alert('Registration failed.');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 mt-4 p-2">
      <div className="card p-3 shadow-lg" style={{
        width: '100%',
        maxWidth: '450px',
        borderRadius: '20px',
        background: '#ffffffee',
        transition: 'transform 0.3s ease',
      }}>
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
              name="username"
              placeholder="Admin Username"
              value={formData.adminname}
              onChange={handleChange}
              required
              autoComplete="username"
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
          </div>
          <button className="btn btn-danger w-100 rounded-3" type="submit">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account?{' '}
            <a href="/admin/login" className="text-primary text-decoration-none">Login</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
