// src/services/MovieService.js

import axios from 'axios';

const API_BASE = 'http://localhost:8080/movie';

class MovieService {

    getAllMovies() {
        return axios.get(`${API_BASE}/movies`);
    }

    getMovieById(id) {
        return axios.get(`${API_BASE}/movieid/${id}`);
    }

    addMovie(data) {
        return axios.post(`${API_BASE}/addmovie`, data);
    }

    updateMovie(id, data) {
        return axios.put(`${API_BASE}/update/${id}`, data);
    }

    deleteMovie(id) {
        return axios.delete(`${API_BASE}/delete/${id}`);
    }

    searchMovies(query) {
        return axios.get(`${API_BASE}/search/${query}`);
    }

}

export default new MovieService();
