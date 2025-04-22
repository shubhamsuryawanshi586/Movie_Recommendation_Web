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

    getMoviesByGenre = async (genrename) => {
       return axios.get(`${API_BASE}/category/${genrename}`);
      };

    getAllGenres(){
        return axios.get(`${API_BASE}/getallgenres`)
    }

    getMoviesByLanguage(){
        return axios.get(`${API_BASE}/getmoviesbylanguage`)
   } 

   getMovieCountByLanguage(){
    return axios.get(`${API_BASE}/getmoviecountbylanguage`)
   }

   getMoviesByLanguageAndGenre(language, genrename){
    return axios.get(`${API_BASE}/getmoviesbylangaugewithgenre/${language}/${genrename}`);
   }

}

export default new MovieService();
