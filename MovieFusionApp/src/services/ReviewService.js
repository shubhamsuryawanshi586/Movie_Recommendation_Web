import axios from 'axios';

const API_BASE = 'http://localhost:8080/review';

class ReviewService {

  addReview(data) {
    return axios.post(`${API_BASE}/addreview`, data);
  }
}

export default new ReviewService();
