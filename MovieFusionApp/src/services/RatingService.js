import axios from 'axios';

const API_BASE = 'http://localhost:8080/review';

class ReviewService {

  addReview(userId, movieId) {
    return axios.post(`${API_BASE}/addReview/${userId}/${movieId}`);
  }
}

export default new ReviewService();
