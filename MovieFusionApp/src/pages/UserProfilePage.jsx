import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import './css/ProfilePage.css';
import { Spinner, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    const currentAccount = AuthService.getCurrentAccount();
    console.log('Current Account:', currentAccount);

    if (!currentAccount || !currentAccount.user_id) {
      alert('User not logged in. Please login.');
      window.location.href = '/login';
      return;
    }

    const isAdminAccount = currentAccount.user_role_name === 'Admin';
    setIsAdmin(isAdminAccount);

    const fetchProfileMethod = isAdminAccount
      ? UserService.getAdminProfile
      : UserService.getUserProfile;

    fetchProfileMethod(currentAccount.user_id)
      .then(res => {
        console.log('Profile Response:', res.data);
        setProfile(res.data);
        setFormData({ username: res.data.user_name, email: res.data.email });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        alert('Failed to load profile.');
        setLoading(false);
      });
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const currentAccount = AuthService.getCurrentAccount();

    let updatedProfile;
    if (isAdmin) {
      updatedProfile = {
        user_id: currentAccount.user_id,
        admin_name: formData.username,
        email: formData.email,
      };
    } else {
      updatedProfile = {
        user_id: currentAccount.user_id,
        user_name: formData.username,
        email: formData.email,
      };
    }

    const updateProfileMethod = isAdmin
      ? UserService.updateAdminProfile
      : UserService.updateUserProfile;

    const idToUpdate = currentAccount.user_id;

    console.log('Updating profile for', isAdmin ? 'Admin' : 'User', 'with ID:', idToUpdate);

    updateProfileMethod(updatedProfile, idToUpdate)
      .then(res => {
        alert('Profile updated successfully!');

        const updatedAccount = {
          ...currentAccount,
          user_name: formData.username,
          admin_name: formData.username,
          email: formData.email,
        };

        AuthService.updateCurrentAccount(updatedAccount);

        setProfile(prev => ({
          ...prev,
          user_name: formData.username,
          email: formData.email,
        }));

        setIsEditing(false);
      })
      .catch(err => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile.');
      });
  };

  const handleClose = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profile d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="profile d-flex align-items-center justify-content-center">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card profile-card shadow p-4 position-relative">

              {/* ✅ Close button */}
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Close"
                onClick={handleClose}
              />

              <h2 className="text-center mb-4">My Profile</h2>

              {!isEditing ? (
                <>
                  <div className="mb-3 d-flex">
                    <strong className="me-2">Name:</strong>
                    <span>{profile.user_name}</span>
                  </div>

                  <div className="mb-3 d-flex">
                    <strong className="me-2">Email:</strong>
                    <span>{profile.email}</span>
                  </div>

                  <div className="text-center mt-4">
                    <Button variant="primary" onClick={handleUpdateClick}>
                      Update Profile
                    </Button>
                  </div>
                </>
              ) : (
                <Form onSubmit={handleSave}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="text-center mt-4">
                    <Button variant="success" type="submit" className="me-2">
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
