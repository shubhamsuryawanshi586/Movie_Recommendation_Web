import axios from 'axios';

const API_BASE = 'http://localhost:8080/watchlist';

class WatchList {

    addToWatchlist(userId, movieId) {
        return axios.post(`/api/watchlist`, { userId, movieId });
      }
}

export default new WatchList();
