import React, { useEffect, useState } from 'react';
import TMDB from '../services/TMDB';
import MovieService from '../services/MovieService';
import './css/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [posterUrls, setPosterUrls] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await MovieService.getMovieCountByLanguage();
        setLanguages(res.data);
      } catch (error) {
        console.error('Error fetching languages', error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await MovieService.getAllGenresByLanguage(selectedLanguage);
        setGenres(res.data);
      } catch (error) {
        console.error('Error fetching genres', error);
      }
    };
    fetchGenres();
  }, [selectedLanguage]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (selectedLanguage && selectedGenre) {
          const res = await MovieService.getMoviesByLanguageAndGenre(selectedLanguage, selectedGenre);
          const data = res.data.movies || res.data;
          setMovies(Array.isArray(data) ? data : []);
        } else {
          setMovies([]);
        }
      } catch (err) {
        console.error('Error fetching movies', err);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [selectedLanguage, selectedGenre]);

  useEffect(() => {
    const fetchPosters = async () => {
      const urls = {};
      for (const movie of movies) {
        if (!urls[movie.original_movie_id]) {
          try {
            const url = await TMDB.fetchMoviePosterById(movie.original_movie_id);
            urls[movie.original_movie_id] = url;
          } catch (error) {
            urls[movie.original_movie_id] = '/default-poster.jpg';
          }
        }
      }
      setPosterUrls(urls);
    };

    if (Array.isArray(movies) && movies.length > 0) {
      fetchPosters();
    }
  }, [movies]);

  return (
    <div className='homepage'>
      <div className="container-fluid homepage py-4">

        <div className="dropdown-row mb-0">
          {/* Language Dropdown */}
          <div className="dropdown-container">
            <label htmlFor="language-select" className="form-label">Select Language:</label>
            <select
              id="language-select"
              className="form-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language.movie_language} value={language.movie_language}>
                  {language.movie_language} ({language.movie_count})
                </option>
              ))}
            </select>
          </div>

          {/* Genre Dropdown */}
          <div className="dropdown-container">
            <label htmlFor="genre-select" className="form-label">Select Genre:</label>
            <select
              id="genre-select"
              className="form-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* Show More Button */}
        <div className="button-container">
          <button
            className="see-more-btn"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'See more..'}
          </button>
        </div>

        {/* Movie List */}
        <div className={`movie-list ${showMore ? 'show-all' : 'show-limited'}`}>
          {Array.isArray(movies) && movies.slice(0, showMore ? movies.length : 5).map((movie) => (
            <div key={movie.movie_id} className="movie-item">
              <div className="poster-container">
                <img
                  className="poster-image"
                  onClick={() => navigate(`/movie/${movie.movie_id}`)}
                  src={posterUrls[movie.original_movie_id] || '/default-poster.jpg'}
                  alt={movie.movie_title}
                  title={movie.movie_title}
                />
                <div className="poster-overlay">
                  <p>{movie.movie_title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
