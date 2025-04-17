import axios from 'axios';

const API_BASE = 'http://localhost:8080/rating';

class RatingService {

  addToWatchlist(userId, movieId) {
    return axios.post(`${API_BASE}/addRating/${userId}/${movieId}`);
  }
}

export default new RatingService();
