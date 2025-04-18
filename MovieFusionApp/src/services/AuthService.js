import axios from 'axios';

const API_BASE = 'http://localhost:8080';

class AuthService {
  // User login
  async userLogin(data) {
    try {
      const response = await axios.post(`${API_BASE}/user/login`, data);
      if (response.data && typeof response.data === 'object') {
        localStorage.setItem('user', JSON.stringify(response.data));
        window.dispatchEvent(new Event('userChanged'));
        window.location.reload();
        window.location.href = '/';
      }
      return response.data;
    } catch (error) {
      console.error('User login failed:', error);
      throw error;
    }
  }
  
  //  Admin login
  async adminLogin(data) {
    try {
      const response = await axios.post(`${API_BASE}/admin/login`, data);
      if (response.data && typeof response.data === 'object') {
        const adminData = {
          ...response.data,
          user_role_name: 'Admin',
        };
        localStorage.setItem('admin', JSON.stringify(adminData));
        window.dispatchEvent(new Event('userChanged'));
        window.location.reload();
        window.location.href = '/';
        return adminData;
      }
      return null;
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    }
  }  

  // User registration
  async userRegister(data) {
    try {
      const response = await axios.post(`${API_BASE}/user/register`, data);
      return response.data;
    } catch (error) {
      console.error('User registration failed:', error);
      throw error;
    }
  }

  // Admin registration
  async adminRegister(data) {
    try {
      const response = await axios.post(`${API_BASE}/admin/register`, data);
      return response.data;
    } catch (error) {
      console.error('Admin registration failed:', error);
      throw error;
    }
  }

  // Get current logged in user or admin
  getCurrentAccount() {
    const adminRaw = localStorage.getItem('admin');
    const userRaw = localStorage.getItem('user');

    // Validate and parse admin
    if (adminRaw && adminRaw !== "undefined") {
      try {
        return JSON.parse(adminRaw);
      } catch (e) {
        console.error("Error parsing admin from localStorage:", e);
      }
    }

    // Validate and parse user
    if (userRaw && userRaw !== "undefined") {
      try {
        return JSON.parse(userRaw);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }

    return null;
  }


  // Logout user or admin
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    window.dispatchEvent(new Event('userChanged'));
    window.location.reload(); // Refresh the page
    window.location.href = '/';
  }

  // 🛠️ Update current user or admin
  updateCurrentAccount(updatedAccount) {
    if (updatedAccount.user_role_name === 'Admin') {
      localStorage.setItem('admin', JSON.stringify(updatedAccount));
    } else {
      localStorage.setItem('user', JSON.stringify(updatedAccount));
    }
    window.dispatchEvent(new Event('userChanged'));
  }
}

export default new AuthService();
