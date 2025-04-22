const API_KEY = "c422420dfc4d7ddaf8d62e3938fc686a";
const BASE_URL = "https://api.themoviedb.org/3";

class TMDB {

  languageCodeMapping = {
    "English": "en",
    "Hindi": "hi",
    "Spanish": "es",
    "French": "fr",
    "German": "de",
    "Chinese": "zh",
    "Japanese": "ja",
    "Korean": "ko",
    "Italian": "it",
    "Russian": "ru",
    "Portuguese": "pt",
    // Add more languages as needed
  };

  // Use 'this' to correctly access languageCodeMapping
  getLanguageCode = (languageName) => {
    const code = this.languageCodeMapping[languageName];
    if (code) {
      return code;
    } else {
      console.warn(`Language code for "${languageName}" not found.`);
      return 'en'; // Default to English if not found
    }
  };

  // fetchMoviePosterByTitle = async (title, movie_release_date, movie_language) => {
  //   try {
  //     const releaseYear = new Date(movie_release_date).getFullYear();
  //     const lang_code = this.getLanguageCode(movie_language); // Access method correctly

  //     // Log the parameters to make sure they are correct
  //     console.log(`Searching for: ${title}, Release Year: ${releaseYear}, Language: ${movie_language}`);

  //     const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&language=${lang_code}&year=${releaseYear}`);
  //     const data = await response.json();

  //     // Log the raw data to inspect the API response
  //     // console.log('API Response:', data);

  //     if (data.results && data.results.length > 0) {
  //       // Search for the exact match by language and year
  //       const matchedMovie = data.results.find(movie => {
  //         const movieYear = new Date(movie.release_date).getFullYear();

  //         return movieYear === releaseYear && movie.original_language === lang_code;
  //       });
  //       console.log(matchedMovie);
  //       if (matchedMovie && matchedMovie.poster_path) {
  //         // Return the poster URL if a match is found
  //         console.log("Done");
  //         return `https://image.tmdb.org/t/p/w500${matchedMovie.poster_path}`;
  //       }
  //     }

  //     // Return default image if no match found
  //     return '/default-poster.jpg';
  //   } catch (error) {
  //     console.error('Error fetching poster:', error);
  //     return '/default-poster.jpg';
  //   }
  // };

  fetchMoviePosterById = async (original_movie_id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${original_movie_id}?api_key=${API_KEY}`
      );
      const data = await response.json();

      console.log('TMDb Movie Details:', data);

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
