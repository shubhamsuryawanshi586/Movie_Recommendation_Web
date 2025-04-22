const API_KEY = "c422420dfc4d7ddaf8d62e3938fc686a";
const BASE_URL = "https://api.themoviedb.org/3";

class TMDB {

  fetchMoviePosterById = async (original_movie_id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${original_movie_id}?api_key=${API_KEY}`
      );
      const data = await response.json();

      // console.log('TMDb Movie Details:', data);

      if (data && data.poster_path) {
        return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      }

      return '/default-poster.jpg';
    } catch (error) {
      console.error('Error fetching movie poster:', error);
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
