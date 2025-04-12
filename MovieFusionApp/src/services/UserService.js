import axios from 'axios';

const API = 'http://localhost:8080';

class UserService {
  // ==== USER Methods ====
  getUserProfile(userId) {
    return axios.get(`${API}/user/profile/${userId}`);
  }

  updateUserProfile(profile, userId) {
    return axios.put(`${API}/user/profile/update/${userId}`, profile);
  }

  // ==== ADMIN Methods ====
  getAdminProfile(adminId) {
    return axios.get(`${API}/admin/profile/${adminId}`);
  }

  updateAdminProfile(profile, adminId) {
    return axios.put(`${API}/admin/profile/update/${adminId}`, profile);
  }
}

export default new UserService();
