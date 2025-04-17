import axios from 'axios';

const API_BASE = 'http://localhost:8080/watchlist';

class WatchListService {

  addToWatchlist(userId, movieId) {
    return axios.post(`${API_BASE}/addmovie/${userId}/${movieId}`);
  }

  getWatchlist(userId) {
    return axios.get(`${API_BASE}/allWatchlist/${userId}`)
  }
}

export default new WatchListService();
