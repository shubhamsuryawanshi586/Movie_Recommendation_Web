const API_KEY = "c422420dfc4d7ddaf8d62e3938fc686a";
const BASE_URL = "https://api.themoviedb.org/3";

class TMDB {

  fetchMoviePosterByTitle = async (title) => {
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`);
      const data = await response.json();
      if (data.results && data.results.length > 0 && data.results[0].poster_path) {
        return `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
      } else {
        return '/default-poster.jpg'; 
      }
    } catch (error) {
      console.error('Error fetching poster:', error);
      return '/default-poster.jpg'; 
    }
  };

  getTrendingMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  };

  getMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching genre movies:', error);
      return [];
    }
  };
  
  
}

export default new TMDB();
