import axios from 'axios';

const API_BASE = 'http://localhost:8080/rating';

class RatingService {

  addRating(data) {
    return axios.post(`${API_BASE}/addrating`, data);
  }
}

export default new RatingService();
